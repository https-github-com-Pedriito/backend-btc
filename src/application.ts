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
import { Resend } from 'resend';

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
          payment_method_types: ['card' , 'sepa_debit','link', 'klarna','revolut_pay','paypal'],
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
      try {
        const { to, subject, cart } = req.body;
    
        if (!to || !subject || !cart) {
          return res.status(400).json({ error: 'Missing required fields: to, subject, cart' });
        }
    
        const resend = new Resend(process.env.RESEND_API_KEY);
    
        // Construire le contenu HTML à partir du panier
        const cartHtml = cart
          .map((item: any) => {
            let optionsHtml = '';
            if (item.selectedOptions) {
              optionsHtml = item.selectedOptions
          .map((option: any) => `<li>Option: ${option}</li>`)
          .join('');
            }
            let theHtml = '';
            if (item.selectedThe) {
              theHtml = item.selectedThe
          .map((the: any) => `<li>Thé: ${the}</li>`)
          .join('');
            }
            let perlesHtml = '';
            if (item.selectedPerles) {
              perlesHtml = item.selectedPerles
          .map((perle: any) => `<li>Perles: ${perle}</li>`)
          .join('');
            }
            let parfumsHtml = '';
            if (item.selectedParfums) {
              parfumsHtml = item.selectedParfums
          .map((parfum: any) => `<li>Parfum: ${parfum}</li>`)
          .join('');
            }
            return `
              <li>
          ${item.title} - ${item.quantity} x ${item.price}€
          <ul>
            ${optionsHtml}
            ${theHtml}
            ${perlesHtml}
            ${parfumsHtml}
          </ul>
              </li>
            `;
          })
          .join('');
    
        const emailContent = `
          <h1>Récapitulatif de votre commande</h1>
          <ul>${cartHtml}</ul>
          <p>Total : ${cart.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)}€</p>
        `;
    
        const { data, error } = await resend.emails.send({
          from: 'Acme <onboarding@resend.dev>',
          to: [to],
          subject,
          html: emailContent, // Utilise ton contenu HTML
        });
    
        if (error) {
          return res.status(500).json({ error });
        }
    
        res.status(200).json({ message: 'Email sent successfully', data });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    });

    // Mount Express app into LoopBack
    this.expressMiddleware('middleware.express', expressApp, {
      injectConfiguration: false,
    });
  }
}