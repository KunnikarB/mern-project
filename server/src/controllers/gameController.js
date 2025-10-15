import Game from '../models/Game.js';

export const createGame = async (req, res) => {
  try {
    const { name } = req.body;
    const game = new Game({ name });
    await game.save();
    res.status(201).json(game);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to create game', error: err.message });
  }
};

export const getAllGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to fetch games', error: err.message });
  }
};
