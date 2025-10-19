import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 🧍 Total play time per user
export const userTotals = async (req: Request, res: Response) => {
  try {
    const data = await prisma.playSession.groupBy({
      by: ['userId'],
      _sum: { minutesPlayed: true },
    });

    const results = await Promise.all(
      data.map(async (d) => {
        const user = await prisma.user.findUnique({ where: { id: d.userId } });
        return {
          user: `${user?.firstName} ${user?.lastName}`,
          totalMinutes: d._sum.minutesPlayed ?? 0,
        };
      })
    );

    res.json(results);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// 🎮 Total play time per game
export const gameTotals = async (req: Request, res: Response) => {
  try {
    const data = await prisma.playSession.groupBy({
      by: ['gameId'],
      _sum: { minutesPlayed: true },
    });

    const results = await Promise.all(
      data.map(async (d) => {
        const game = await prisma.game.findUnique({ where: { id: d.gameId } });
        return {
          game: game?.name,
          totalMinutes: d._sum.minutesPlayed ?? 0,
        };
      })
    );

    res.json(results);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// 📅 Total minutes played per user per day
export const userPerDay = async (req: Request, res: Response) => {
  try {
    const sessions = await prisma.playSession.findMany({
      select: {
        userId: true,
        minutesPlayed: true,
        createdAt: true,
      },
    });

    // Group by user and day
    const stats: Record<string, Record<string, number>> = {};

    sessions.forEach((s) => {
      const day = s.createdAt.toISOString().split('T')[0]; // YYYY-MM-DD
      if (!stats[s.userId]) stats[s.userId] = {};
      if (!stats[s.userId][day]) stats[s.userId][day] = 0;
      stats[s.userId][day] += s.minutesPlayed;
    });

    return res.json(stats);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error instanceof Error ? error.message : error });
  }
};

// 🏆 Leaderboard: top user per game (SQL-optimized)
export const leaderboard = async (req: Request, res: Response) => {
  try {
    // Step 1: Get max minutesPlayed per game
    const maxByGame = await prisma.playSession.groupBy({
      by: ['gameId'],
      _max: { minutesPlayed: true },
    });

    // Step 2: Find the user(s) who achieved that max per game
    const results = await Promise.all(
      maxByGame.map(async (record) => {
        const topSession = await prisma.playSession.findFirst({
          where: {
            gameId: record.gameId,
            minutesPlayed: record._max.minutesPlayed ?? 0,
          },
          include: { user: true, game: true },
        });

        return {
          user: `${topSession?.user.firstName} ${topSession?.user.lastName}`,
          game: topSession?.game.name,
          timePlayed: `${Math.floor((topSession?.minutesPlayed ?? 0) / 60)} hours ${
            (topSession?.minutesPlayed ?? 0) % 60
          } minutes`,
        };
      })
    );

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error instanceof Error ? error.message : error });
  }
};

