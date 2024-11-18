"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendApplication = void 0;
const tslib_1 = require("tslib");
const boot_1 = require("@loopback/boot");
const rest_explorer_1 = require("@loopback/rest-explorer");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const service_proxy_1 = require("@loopback/service-proxy");
const path_1 = tslib_1.__importDefault(require("path"));
const sequence_1 = require("./sequence");
const express_1 = tslib_1.__importDefault(require("express"));
const nodemailer = require("nodemailer");
require("dotenv/config");
const stripe_1 = tslib_1.__importDefault(require("stripe"));
const resend_1 = require("resend");
require('dotenv').config();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
    throw new Error('STRIPE_SECRET_KEY is not defined');
}
const stripe = new stripe_1.default(stripeSecretKey);
class BackendApplication extends (0, boot_1.BootMixin)((0, service_proxy_1.ServiceMixin)((0, repository_1.RepositoryMixin)(rest_1.RestApplication))) {
    constructor(options = {}) {
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
        this.sequence(sequence_1.MySequence);
        // Set up default home page
        this.static('/', path_1.default.join(__dirname, '../public'));
        // Customize @loopback/rest-explorer configuration here
        this.configure(rest_explorer_1.RestExplorerBindings.COMPONENT).to({
            path: '/explorer',
        });
        this.component(rest_explorer_1.RestExplorerComponent);
        this.projectRoot = __dirname;
        this.bootOptions = {
            controllers: {
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
        // Configure Express for Stripe
        const expressApp = (0, express_1.default)();
        expressApp.use(express_1.default.json());
        // Define Stripe-related routes
        expressApp.post('/create-payment-intent', async (req, res) => {
            const { amount } = req.body;
            const orderAmount = amount || 1400;
            try {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: orderAmount,
                    currency: 'eur',
                    automatic_payment_methods: { enabled: true },
                });
                res.send({ clientSecret: paymentIntent.client_secret });
            }
            catch (error) {
                res.status(400).send({ error: { message: error.message } });
            }
        });
        expressApp.get('/stripe-key', (req, res) => {
            const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
            if (!publishableKey) {
                return res.status(500).json({ error: 'Stripe publishable key not configured.' });
            }
            res.json({ publishableKey });
        });
        // Endpoint for sending emails with Nodemailer
        expressApp.post('/send-email', async (req, res) => {
            try {
                const { to, subject, cart } = req.body;
                if (!to || !subject || !cart) {
                    return res.status(400).json({ error: 'Missing required fields: to, subject, cart' });
                }
                const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
                // Construire le contenu HTML à partir du panier
                const cartHtml = cart
                    .map((item) => {
                    let optionsHtml = '';
                    if (item.selectedOptions) {
                        optionsHtml = item.selectedOptions
                            .map((option) => `<li>Option: ${option}</li>`)
                            .join('');
                    }
                    let theHtml = '';
                    if (item.selectedThe) {
                        theHtml = item.selectedThe
                            .map((the) => `<li>Thé: ${the}</li>`)
                            .join('');
                    }
                    let perlesHtml = '';
                    if (item.selectedPerles) {
                        perlesHtml = item.selectedPerles
                            .map((perle) => `<li>Perles: ${perle}</li>`)
                            .join('');
                    }
                    let parfumsHtml = '';
                    if (item.selectedParfums) {
                        parfumsHtml = item.selectedParfums
                            .map((parfum) => `<li>Parfum: ${parfum}</li>`)
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
          <p>Total : ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}€</p>
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
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        // Mount Express app into LoopBack
        this.expressMiddleware('middleware.express', expressApp, {
            injectConfiguration: false,
        });
    }
}
exports.BackendApplication = BackendApplication;
//# sourceMappingURL=application.js.map