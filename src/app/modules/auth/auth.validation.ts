import { z } from 'zod';

export const loginValidation = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password is required'),
  }),
});