import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import express, { Request, Response } from 'express';
const nodemailer = require("nodemailer");
import 'dotenv/config'
import stripePackage from 'stripe';

require('dotenv').config();

declare module 'http' {
  interface IncomingMessage {
    rawBody?: string;
  }
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}
const stripe = new stripePackage(stripeSecretKey);

export {ApplicationConfig};

export class BackendApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up CORS 
    this.bind('rest.cors:options').to({
      origin: '*',
      // Remplace '*' par ton domaine frontend en production
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    });

    // Set up custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    this.bootOptions = {
      controllers: {
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    // Configure Express for Stripe
    const expressApp = express();
    expressApp.use(express.json());

    // Define Stripe-related routes
    expressApp.post('/create-payment-intent', async (req: Request, res: Response) => {
      const { amount } = req.body;
      const orderAmount = amount || 1400;
    
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: orderAmount,
          currency: 'eur',
          automatic_payment_methods: { enabled: true },
        });
    
        res.send({ clientSecret: paymentIntent.client_secret });
      } catch (error) {
        res.status(400).send({ error: { message: error.message } });
      }
    });

    expressApp.get('/stripe-key', (req: Request, res: Response) => {
      const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
      if (!publishableKey) {
        return res.status(500).json({ error: 'Stripe publishable key not configured.' });
      }
      res.json({ publishableKey });
    });

    // Endpoint for sending emails with Nodemailer
    expressApp.post('/send-email', async (req: Request, res: Response) => {
      const { to, subject, text } = req.body;
    
      try {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: false,
          auth: {
            user: process.env.GMAIL_ADDRESS,
            pass: process.env.GMAIL_PASSWORD,
          },
        });
    
        await transporter.sendMail({
          from: process.env.GMAIL_ADDRESS,
          to,
          subject,
          text,
        });
    
        res.status(200).json({ message: 'Email envoyé avec succès' });
      } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email', error });
      }
    });

    // Mount Express app into LoopBack
    this.expressMiddleware('middleware.express', expressApp, {
      injectConfiguration: false,
    });
  }
}