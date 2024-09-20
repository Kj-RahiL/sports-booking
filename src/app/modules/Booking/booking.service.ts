import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { Facility } from '../Facility/facility.model';

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
  const result = await Booking.find().populate('User').populate('facility');
  return result;
};
const getSingleBookingFromDB = async (id: string) => {
  const result = await Booking.findById(id);
  return result;
};
const updateBookingIntoDB = async (id: string, payload: Partial<TBooking>) => {
  const result = await Booking.findByIdAndUpdate(id, [{ $set: payload }], {
    new: true,
  });
  return result;
};
const deleteBookingFromDB = async (id: string) => {
  const isStudentExist = await Booking.findById(id);

  if (!isStudentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This student does not exist');
  }
  const deleteBooking = await Booking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!deleteBooking) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Student');
  }
  return deleteBooking;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getSingleBookingFromDB,
  updateBookingIntoDB,
  deleteBookingFromDB,
};
