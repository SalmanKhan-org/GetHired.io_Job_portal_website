import dotenv from 'dotenv';
dotenv.config({ path: 'C:/JobPortal/.env' });
import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import mongoose from "mongoose";

import * as Sentry from '@sentry/node'
import clerkWebhooks from './controllers/userControllers/webhooks.js';
import connectDB from './config/connectDB.js';

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET','POST','PUT','DELETE']
}))

//Api's
app.post('/api/v1/webhooks', bodyParser.raw({ type: 'application/json' }), clerkWebhooks);
app.use(express.json());
app.get('/', (req, res) => {
    res.send("API's Working successfully")
})

//Sentry for Error Monitoring
Sentry.setupExpressErrorHandler(app);

const PORT = process.env.PORT || 3000;
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