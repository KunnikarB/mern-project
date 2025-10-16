import { z } from 'zod';

export const createPlaySessionSchema = z.object({
  userId: z.string().min(1, 'userId is required'),
  gameId: z.string().min(1, 'gameId is required'),
  minutesPlayed: z.number().min(1, 'minutesPlayed must be at least 1'),
});
