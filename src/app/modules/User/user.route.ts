import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import { userControllers } from './user.controller';

const router = express.Router();

router.post(
  '/create-admin',
  validateRequest(UserValidations.userValidationSchema),
  userControllers.createAdmin,
);

//update
router.put(
  '/:id',
  validateRequest(UserValidations.updateUserValidationSchema),
  userControllers.updateUser,
);
