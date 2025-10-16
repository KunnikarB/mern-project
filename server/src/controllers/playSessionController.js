import { PrismaClient } from '@prisma/client';

import { createPlaySessionSchema } from '../schemas/playSessionSchema.js';

const prisma = new PrismaClient();

export const createPlaySession = async (req, res) => {
  try {
    const parsed = createPlaySessionSchema.parse(req.body);

    const session = await prisma.playSession.create({
      data: {
        userId: parsed.userId,
        gameId: parsed.gameId,
        minutesPlayed: parsed.minutesPlayed,
      },
    });

    res.status(201).json(session);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getPlaySessionsByUser = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: 'Missing userId' });

    const sessions = await prisma.playSession.findMany({
      where: { userId: String(userId) },
      include: { game: true, user: true },
      orderBy: { createdAt: 'asc' },
    });

    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPlaySessionById = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await prisma.playSession.findUnique({
      where: { id },
      include: { game: true, user: true },
    });
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
