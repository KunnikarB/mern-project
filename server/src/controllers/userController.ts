import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { userSchema, userUpdateSchema } from '../validators/userSchema.ts'; // keep .js for ESM

const prisma = new PrismaClient();

// GET /users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// POST /users
export const createUser = async (req: Request, res: Response) => {
  try {
    const validated = userSchema.parse(req.body);

    const profileImage = `https://api.dicebear.com/9.x/lorelei/svg?seed=${encodeURIComponent(
      validated.email
    )}`;

    // Create user with the generated image
    const user = await prisma.user.create({
      data: {
        ...validated,
        profileImage,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res
      .status(400)
      .json({ error: error instanceof Error ? error.message : error });
  }
};

// PUT /users/:id
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const validated = userUpdateSchema.parse(req.body);
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: validated,
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
};

// DELETE /users/:id
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: Number(id) } });
    res.status(204).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error });
  }
};