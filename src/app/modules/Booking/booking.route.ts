import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import Auth from '../../middlewares/auth';
import { USER_Role } from '../User/user.constant';
import { createBookingValidationSchema } from './booking.validation';
import { BookingControllers } from './booking.controller';

const router = express.Router();

// only for admin create
router.post(
  '/',
  validateRequest(createBookingValidationSchema),
  BookingControllers.createBooking,
);
router.get('/:id', BookingControllers.getSingleBooking);

// only for admin update and delete
router.patch('/:id', Auth(USER_Role.admin), BookingControllers.updateBooking);
router.delete('/:id',  BookingControllers.deleteBooking);
router.get('/',Auth(USER_Role.admin), BookingControllers.getAllBooking);

export const BookingRoutes = router;
