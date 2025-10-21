import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { gameSchema, gameUpdateSchema } from '../validators/gameSchema.ts';

const prisma = new PrismaClient();

// GET /games
export const getGames = async (req: Request, res: Response) => {
  try {
    const games = await prisma.game.findMany({
      orderBy: { id: 'asc' },
    });
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch games' });
  }
};

// POST /games
export const createGame = async (req: Request, res: Response) => {
  try {
    const validated = gameSchema.parse(req.body);
    const game = await prisma.game.create({ 
      data: validated });
    res.status(201).json(game);
  } catch (error) {
    res.status(400).json({ error });
  }
};

// PUT /games/:id
export const updateGame = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const validated = gameUpdateSchema.parse(req.body);
    const game = await prisma.game.update({
      where: { id: Number(id) },
      data: validated,
    });
    res.json(game);
  } catch (error) {
    res.status(400).json({ error });
  }
};

// DELETE /games/:id
export const deleteGame = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.game.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error });
  }
};
