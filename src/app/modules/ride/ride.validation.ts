import { z } from 'zod';

export const requestRideValidation = z.object({
  body: z.object({
    pickupLocation: z.object({
      address: z.string().min(1, 'Pickup address is required'),
      coordinates: z.object({
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180),
      }),
    }),
    destination: z.object({
      address: z.string().min(1, 'Destination address is required'),
      coordinates: z.object({
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180),
      }),
    }),
  }),
});

export const updateRideStatusValidation = z.object({
  body: z.object({
    status: z.enum(['accepted', 'picked_up', 'in_transit', 'completed', 'canceled']),
  }),
});