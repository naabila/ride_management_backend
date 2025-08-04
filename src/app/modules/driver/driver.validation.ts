import { z } from 'zod';

export const driverValidationSchema = z.object({
  body: z.object({
    userId: z.string().min(1, 'User ID is required'),
    vehicleInfo: z.object({
      type: z.string().min(1, 'Vehicle type is required'),
      licensePlate: z.string().min(1, 'License plate is required'),
      model: z.string().optional(),
      color: z.string().optional(),
    }),
  }),
});

export const updateDriverValidationSchema = z.object({
  body: z.object({
    isApproved: z.boolean().optional(),
    isOnline: z.boolean().optional(),
  }),
});

//Suspend Driver Validation Schema
export const suspendDriverValidationSchema = z.object({
  body: z.object({
    reason: z.string().min(1, 'Suspension reason is required').max(500, 'Reason must be less than 500 characters'),
  }),
});