import prisma from '../prisma';
import { createGameSchema, updateGameSchema } from '../schemas/gameSchema';

export const createGame = async (req, res) => {
  try {
    const parsed = createGameSchema.parse(req.body);

    const game = await prisma.game.create({ data: parsed });
    res.status(201).json(game);
  } catch (err) {
    res.status(400).json({ message: err?.message || String(err) });
  }
};

export const getAllGames = async (_req, res) => {
  try {
    const games = await prisma.game.findMany({ include: { sessions: true } });
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err?.message || String(err) });
  }
};

export const getGameById = async (req, res) => {
  try {
    const { id } = req.params;
    const game = await prisma.game.findUnique({
      where: { id },
      include: { sessions: true },
    });
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: err?.message || String(err) });
  }
};

export const updateGameById = async (req, res) => {
  try {
    const { id } = req.params;
    const parsed = updateGameSchema.parse(req.body);

    const game = await prisma.game.update({ where: { id }, data: parsed });
    res.json(game);
  } catch (err) {
    res.status(400).json({ message: err?.message || String(err) });
  }
};

export const deleteGameById = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.game.delete({ where: { id } });
    res.json({ message: 'Game deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err?.message || String(err) });
  }
};
