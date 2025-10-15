import User from '../models/User.js';

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, profileImage } = req.body;
    const user = new User({ firstName, lastName, email, profileImage });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to create user', error: err.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};