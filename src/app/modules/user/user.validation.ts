import { z } from 'zod';

export const registerValidation = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
   
    driverDetails: z
      .object({
        vehicleInfo: z
          .object({
            type: z.string().optional(),
            licensePlate: z.string().optional(),
          })
          .optional(),
      })
      .optional(),
  }),
});