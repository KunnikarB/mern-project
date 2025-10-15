import PlaySession from '../models/PlaySession.js';
import StatsDaily from '../models/StatsDaily.js';

export const createPlaySession = async (req, res) => {
  try {
    const { user, game, minutesPlayed, date } = req.body;

    // Create play session
    const session = new PlaySession({ user, game, minutesPlayed, date });
    await session.save();

    // Update daily stats
    const statsDate = date ? new Date(date) : new Date();
    const dayStart = new Date(statsDate.setHours(0, 0, 0, 0));
    const stats = await StatsDaily.findOneAndUpdate(
      { user, game, date: dayStart },
      { $inc: { minutesPlayed } },
      { new: true, upsert: true }
    );

    res.status(201).json({ session, stats });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Failed to create play session', error: err.message });
  }
};

export const getPlaySessions = async (req, res) => {
  try {
    const sessions = await PlaySession.find().populate('user game');
    res.json(sessions);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to fetch sessions', error: err.message });
  }
};
