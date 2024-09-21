import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { Facility } from '../Facility/facility.model';
import mongoose from 'mongoose';

const createBookingIntoDB = async (payload: TBooking, userId: string) => {
  const facility = await Facility.findById(payload.facility);
  if (!facility) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility is not found');
  }

  const result = await Booking.create({
    ...payload,
    user: userId,
    isBooked: 'confirmed',
  });
  return result;
};

const getAllBookingFromDB = async () => {
  const result = await Booking.find().populate('user').populate('facility');
  return result;
};
const getUserBookingFromDB = async (id: string) => {
  const bookings = await Booking.find({ user: id }).populate('facility');
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
