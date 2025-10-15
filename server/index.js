import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './src/routes/itemRoutes.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://mern-project-client-dusky.vercel.app',
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(express.json());
app.use('/items', router);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ Could not connect to MongoDB'));

export default app;