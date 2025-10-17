import { z } from 'zod';

export const playSessionSchema = z.object({
  userId: z.number(),
  gameId: z.number(),
  minutesPlayed: z.number().min(1, 'Must play at least 1 minute'),
  createdAt: z.string().optional(), // optional ISO string
});

export const playSessionUpdateSchema = z.object({
  minutesPlayed: z.number().min(1).optional(),
});
