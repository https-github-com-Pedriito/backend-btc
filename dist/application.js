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
require("dotenv/config");
const express_1 = tslib_1.__importDefault(require("express"));
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-10-28.acacia',
});
class BackendApplication extends (0, boot_1.BootMixin)((0, service_proxy_1.ServiceMixin)((0, repository_1.RepositoryMixin)(rest_1.RestApplication))) {
    constructor(options = {}) {
        super(options);
        // Set up CORS 
        this.bind('rest.cors:options').to({
            origin: 'localhost:5173',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            preflightContinue: false,
            optionsSuccessStatus: 204,
        });
        // Set up the custom sequence
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
        expressApp.use(express_1.default.json({
            verify: (req, res, buf) => {
                if (req.originalUrl.startsWith('/webhook')) {
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
            }
            catch (error) {
                res.status(400).send({
                    error: {
                        message: error.message,
                    },
                });
            }
        });
        expressApp.post('/');
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
            }
            catch (err) {
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
        const uploadsDir = path_1.default.join(__dirname, 'apple-developer-merchantid-domain-association');
        this.static('/.well-known', uploadsDir, {
            index: false,
            setHeaders: (res) => {
                res.setHeader('Content-Type', 'text/plain');
            },
        });
        // Ajout d'un log pour vérifier si le middleware est bien exécuté
        expressApp.get('/.well-known/*', (req, res) => {
            console.log('Request received for', req.originalUrl);
            res.sendStatus(200);
        });
    }
}
exports.BackendApplication = BackendApplication;
//# sourceMappingURL=application.js.map