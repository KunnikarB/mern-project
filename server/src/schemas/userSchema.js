// server/src/schemas/userSchema.js
import { z } from 'zod';

// Base schema (common fields)
const baseUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  profileImage: z.string().url('Invalid URL').optional().or(z.literal('')), // allow empty string
});

// Schema for creating a user
export const createUserSchema = baseUserSchema;

// Schema for updating a user (all fields optional)
export const updateUserSchema = baseUserSchema.partial();
