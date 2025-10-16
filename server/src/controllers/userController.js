// removed TypeScript type imports from JS file
import prisma from '../prisma';
import { createUserSchema, updateUserSchema } from '../schemas/userSchema';

export const createUser = async (req, res) => {
  try {
    const parsed = createUserSchema.parse(req.body);

    const user = await prisma.user.create({ data: parsed });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllUsers = async (_req, res) => {
  try {
    const users = await prisma.user.findMany({ include: { sessions: true } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      include: { sessions: true },
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const parsed = updateUserSchema.parse(req.body);

    const user = await prisma.user.update({ where: { id }, data: parsed });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id } });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
