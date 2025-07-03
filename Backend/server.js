import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import * as Sentry from '@sentry/node'
import clerkWebhooks from './controllers/userControllers/webhooks.js';
import { error } from './middlewares/error.js';
import companyRoutes from './routes/companyRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { clerkMiddleware } from '@clerk/express'

 
const app = express();

app.use(cors({
    origin: 'https://get-hired-io-client.vercel.app',  // ✅ no trailing slash
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


app.use('/api/v1/company', express.json(), companyRoutes);
app.use("/api/v1/jobs", express.json() ,jobRoutes);

app.post('/api/v1/webhooks', bodyParser.raw({ type: 'application/json' }), clerkWebhooks);

app.use(clerkMiddleware({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY
}));
app.use("/api/v1", express.json(),  userRoutes);
//Api's
app.get('/', (req, res) => {
    res.send("API's Working successfully")
})

// error handler middleware
app.use(error);
//Sentry for Error Monitoring
Sentry.setupExpressErrorHandler(app);

const PORT = process.env.PORT ;
// Connect to MongoDB and start the server
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected to MongoDB");

        // Start server only after DB is connected
        app.listen(PORT, () => {
            console.log(`🚀 Server is listening on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error.message);
        process.exit(1); // Exit if DB connection fails
    }
};

startServer();