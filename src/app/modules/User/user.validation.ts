import { z } from 'zod';
import { USER_Role } from './user.constant';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    phone: z.string(),
    role: z.nativeEnum(USER_Role),
    address: z.string(),
  }),
});

const updateUserValidationSchema = z.object({
  name: z.string().optional(),
  role: z.nativeEnum(USER_Role).optional(),
  address: z.string().optional(),
});

export const UserValidations = {
  userValidationSchema,
  updateUserValidationSchema,
};
