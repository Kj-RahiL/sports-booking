import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { Facility } from '../Facility/facility.model';
import { getUser } from '../../utils/getUser';
import { initialPayment } from '../payment/payment.utils';

const createBookingIntoDB = async (payload: TBooking, token: string) => {
  const userData = await getUser(token);
  const facility = await Facility.findById(payload.facility);
  if (!facility) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility is not found');
  }
  const transactionId = `TXN-${Date.now()}`;

  const booking = await Booking.create({
    ...payload,
    user: userData.id,
    isBooked: 'confirmed',
    transactionId
  });
  const paymentData = {
    transactionId,
    totalPrice: booking.payableAmount,
    customerName: userData.name,
    customerEmail: userData.email,
    customerPhone: userData.phone,
    customerAddress: userData.address,
  };
  const paymentSession = await initialPayment(paymentData);

  return paymentSession;
};

const getAllBookingFromDB = async () => {
  const result = await Booking.find().populate('user').populate('facility');
  return result;
};
const getUserBookingFromDB = async (token: string) => {
  const userData = await getUser(token);
  const bookings = await Booking.find({ user: userData.id }).populate(
    'facility',
  );

  return bookings;
};

const deleteBookingFromDB = async (id: string) => {
  // check existing booking
  const isBookingExist = await Booking.findById(id);
  if (!isBookingExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This booking does not exist');
  }

  const canceledBooking = await Booking.findByIdAndUpdate(
    id,
    { isBooked: 'canceled' },
    { new: true },
  ).populate('facility');
  if (!canceledBooking) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to canceled booking');
  }

  return canceledBooking;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getUserBookingFromDB,
  deleteBookingFromDB,
};
