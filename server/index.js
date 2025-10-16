import express from 'express';
import cors from 'cors';
import userRoutes from './src/routes/userRoutes.js';
import gameRoutes from './src/routes/gameRoutes.js';
import playSessionRoutes from './src/routes/userRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/games', gameRoutes);
app.use('/play-sessions', playSessionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
