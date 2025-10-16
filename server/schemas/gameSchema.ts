import { z } from 'zod';

export const createGameSchema = z.object({
  name: z.string().min(1, 'Game name is required'),
});

export const updateGameSchema = createGameSchema.partial();
