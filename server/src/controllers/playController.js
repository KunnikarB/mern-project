import PlaySession from '../models/PlaySession.js';
import mongoose from 'mongoose';

// create a play session (when user stops or records minutes)
export const createPlaySession = async (req, res) => {
  try {
    const { userId, gameId, minutes, date } = req.body;
    const session = new PlaySession({
      user: userId,
      game: gameId,
      minutes,
      date: date ? new Date(date) : new Date(),
    });
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// basic aggregation: minutes per user per day
export const statsMinutesPerUserPerDay = async (req, res) => {
  try {
    const agg = await PlaySession.aggregate([
      {
        $group: {
          _id: {
            user: '$user',
            day: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          },
          totalMinutes: { $sum: '$minutes' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id.user',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $project: {
          day: '$_id.day',
          userId: '$_id.user',
          userName: { $concat: ['$user.firstName', ' ', '$user.lastName'] },
          totalMinutes: 1,
        },
      },
      { $sort: { day: 1, userName: 1 } },
    ]);
    res.json(agg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// leaderboard: top by minutes per game or per overall
export const leaderboard = async (req, res) => {
  try {
    const byUserGame = await PlaySession.aggregate([
      {
        $group: {
          _id: { user: '$user', game: '$game' },
          minutes: { $sum: '$minutes' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id.user',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $lookup: {
          from: 'games',
          localField: '_id.game',
          foreignField: '_id',
          as: 'game',
        },
      },
      { $unwind: '$game' },
      {
        $project: {
          playerName: { $concat: ['$user.firstName', ' ', '$user.lastName'] },
          gameName: '$game.name',
          minutes: 1,
        },
      },
      { $sort: { minutes: -1 } },
      { $limit: 100 },
    ]);
    res.json(byUserGame);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
