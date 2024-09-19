
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validations';
import { AuthControllers } from './auth.controller';
import { UserValidations } from '../User/user.validation';


const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.login,
);

router.post(
  '/signup',
  validateRequest(UserValidations.userValidationSchema),
  AuthControllers.signup,
);



export const AuthRoutes = router;
