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
      include: { user: true },
    });

    const dailyTotals = sessions.reduce((acc, s) => {
      const date = s.createdAt.toISOString().split('T')[0];
      const key = `${s.userId}-${date}`;
      acc[key] = (acc[key] || 0) + s.minutesPlayed;
      return acc;
    }, {} as Record<string, number>);

    const results = Object.entries(dailyTotals).map(([key, total]) => {
      const [userId, date] = key.split('-');
      return { userId: Number(userId), date, totalMinutes: total };
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// 🏆 Leaderboard: user, game, time played
export const leaderboard = async (req: Request, res: Response) => {
  try {
    const sessions = await prisma.playSession.findMany({
      include: { user: true, game: true },
      orderBy: { minutesPlayed: 'desc' },
    });

    const results = sessions.map((s) => ({
      user: `${s.user.firstName} ${s.user.lastName}`,
      game: s.game.name,
      timePlayed: `${Math.floor(s.minutesPlayed / 60)} hours ${
        s.minutesPlayed % 60
      } minutes`,
    }));

    res.json(results);
  } catch (error) {
    res.status(500).json({ error });
  }
};
