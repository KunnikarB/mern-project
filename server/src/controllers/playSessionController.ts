import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import {
  playSessionSchema,
  playSessionUpdateSchema,
} from '../validators/playSessionSchema.ts';

const prisma = new PrismaClient();

// GET all play sessions
export const getPlaySessions = async (req: Request, res: Response) => {
  try {
    const sessions = await prisma.playSession.findMany({
      include: { user: true, game: true },
    });
    return res.json(sessions);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch play sessions' });
  }
};

// POST new play session
export const createPlaySession = async (req: Request, res: Response) => {
  try {
    const validated = playSessionSchema.parse(req.body);
    const session = await prisma.playSession.create({
      data: {
        ...validated,
        createdAt: validated.createdAt
          ? new Date(validated.createdAt)
          : undefined,
        updatedAt: validated.createdAt
          ? new Date(validated.createdAt)
          : undefined,
      },
    });
    return res.status(201).json(session);
  } catch (error) {
    return res
      .status(400)
      .json({ error: error instanceof Error ? error.message : error });
  }
};

// PUT /play-sessions/:id
export const updatePlaySession = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const validated = playSessionUpdateSchema.parse(req.body);
    const session = await prisma.playSession.update({
      where: { id: Number(id) },
      data: validated,
    });
    return res.json(session);
  } catch (error) {
    return res
      .status(400)
      .json({ error: error instanceof Error ? error.message : error });
  }
};

// DELETE /play-sessions/:id
export const deletePlaySession = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.playSession.delete({ where: { id: Number(id) } });
    return res.status(204).send();
  } catch (error) {
    return res
      .status(400)
      .json({ error: error instanceof Error ? error.message : error });
  }
};
