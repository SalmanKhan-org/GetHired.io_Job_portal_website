import dotenv from 'dotenv';
dotenv.config({ path: 'C:/JobPortal/.env' });
import './config/instrument.js'
import express from 'express'
import cors from 'cors'

import * as Sentry from '@sentry/node'
import clerkWebhooks from './controllers/userControllers/webhooks.js';

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET','POST','PUT','DELETE']
}))
app.use(express.json());

import mongoose from "mongoose";

// connect to Database 
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI).then((res) => {
            console.log("Connect to DB successfully");
        })
    } catch (error) {
        console.log(error);
    }
}

//Api's
app.post('/api/v1/webhooks', clerkWebhooks);
app.get('/', (req, res) => {
    res.send("API's Working successfully")
})

//Sentry for Error Monitoring
Sentry.setupExpressErrorHandler(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
    connectDB();
    console.log(`Server is listening at port ${PORT}`);
})