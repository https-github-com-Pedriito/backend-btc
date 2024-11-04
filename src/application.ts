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
import 'dotenv/config';
import express from 'express';
import { IncomingMessage } from 'http';

declare module 'http' {
  interface IncomingMessage {
    rawBody?: string;
  }
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-10-28.acacia',
});

export {ApplicationConfig};

export class BackendApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up CORS 
    this.bind('rest.cors:options').to({
      origin: 'localhost:5173', // Remplacez '*' par votre domaine de frontend en production
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    });

    // Set up the custom sequence
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
    expressApp.use(express.json({
      verify: (req, res, buf) => {
        if ((req as express.Request).originalUrl.startsWith('/webhook')) {
          req.rawBody = buf.toString();
        }
      },
    }));

    // Define Stripe-related routes
    expressApp.get('/create-payment-intent', async (req, res) => {
      let orderAmount = 1400; // Montant de l'ordre par défaut
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          currency: 'eur',
          amount: orderAmount,
          automatic_payment_methods: { enabled: true },
        });

        res.send({
          clientSecret: paymentIntent.client_secret,
        });
      } catch (error) {
        res.status(400).send({
          error: {
            message: error.message,
          },
        });
      }
    });

    expressApp.post('/')

    expressApp.get('/stripe-key', (req, res) => {
      if (!process.env.STRIPE_PUBLISHABLE_KEY) {
        return res.status(500).json({ error: 'Stripe publishable key not configured.' });
      }
      res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
    });

    expressApp.post('/webhook', (req, res) => {
      const sig = req.headers['stripe-signature'];

      let event;
      try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
      } catch (err) {
        console.log('⚠️  Webhook signature verification failed.');
        return res.sendStatus(400);
      }

      // Handle the event
      switch (event.type) {
        case 'payment_intent.succeeded':
          console.log('💰 Payment captured!');
          break;
        case 'payment_intent.payment_failed':
          console.log('❌ Payment failed.');
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      res.sendStatus(200);
    });

    // **Nouvel endpoint pour récupérer la clé publique Stripe**
    expressApp.get('/stripe-key', (req, res) => {
      res.send({
        publishableKey: process.env.STRIPE_PUBLIC_KEY,
      });
    });

    // Mount Express app into LoopBack
    this.expressMiddleware('middleware.express', expressApp, {
      injectConfiguration: false,
    });

    // Mount apple pay file
// Chemin vers le répertoire contenant le fichier
const uploadsDir = path.join(__dirname, 'apple-developer-merchantid-domain-association');
    this.static('/.well-known', uploadsDir, {
      index: false,
      setHeaders: (res) => {
        res.setHeader('Content-Type', 'text/plain');
      },
    });
  }
}