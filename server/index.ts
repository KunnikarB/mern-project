import express from 'express';
import cors from 'cors';
import userRoutes from './src/routes/userRoutes.ts';
import gameRoutes from './src/routes/gameRoutes.ts';
import statsRoutes from './src/routes/statsRoutes.ts';
import playSessionRoutes from './src/routes/playSessionRoutes.ts';


const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/games', gameRoutes);
app.use('/stats', statsRoutes);
app.use('/sessions', playSessionRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
