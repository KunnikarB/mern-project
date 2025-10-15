import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './src/routes/itemRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ Could not connect to MongoDB'));

export default app;