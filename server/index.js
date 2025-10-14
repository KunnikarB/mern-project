import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './src/routes/itemRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  'https://mern-deploy-client-psi.vercel.app/',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS policy: ${origin} not allowed`));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Routes
app.use(router);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ Could not connect to MongoDB'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server is running on Port ${PORT}`));
