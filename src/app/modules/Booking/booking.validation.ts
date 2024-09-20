import { z } from 'zod';

export const createBookingValidationSchema = z.object({
  body: z.object({
    date: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    facility: z.string(),
  }),
});

export const updateBookingValidationSchema = z.object({
  body: z.object({
    date: z.string().optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    facility: z.string().optional(),
  }),
});
