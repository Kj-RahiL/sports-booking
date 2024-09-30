import { z } from 'zod';

export const createFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    image: z.string(),
    description: z.string(),
    pricePerHour: z.number().positive(),
    location: z.string(),
  }),
});

export const updateFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    pricePerHour: z.number().positive().optional(),
    location: z.string().optional(),
  }),
});
