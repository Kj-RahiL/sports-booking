import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import Auth from '../../middlewares/auth';
import { USER_Role } from '../User/user.constant';
import { createBookingValidationSchema } from './booking.validation';
import { BookingControllers } from './booking.controller';
import userAuth from '../../middlewares/userAuth';

const router = express.Router();

// only for admin create
router.post(
  '/',
  validateRequest(createBookingValidationSchema),
  BookingControllers.createBooking,
);
router.get('/user', BookingControllers.getUserBooking);

// only for admin update and delete
router.delete('/:id', Auth(USER_Role.user), BookingControllers.deleteBooking);

// only for admin
router.get('/', Auth(USER_Role.admin), BookingControllers.getAllBooking);

export const BookingRoutes = router;
