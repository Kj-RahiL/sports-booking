import { z } from 'zod';
import { USER_Role } from '../User/user.constant';

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Id is required' }).email(),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

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

export const AuthValidation = {
  loginValidationSchema,
  userValidationSchema,
};
