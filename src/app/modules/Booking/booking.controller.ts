import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { BookingServices } from './booking.service';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/appError';
import config from '../../config';
import { USER_Role } from '../User/user.constant';
import { User } from '../User/user.model';

const createBooking: RequestHandler = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  // checking token
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You're not Authorized");
  }

  // checking if the valid token
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;
  const { role, email } = decoded;

  if (role !== USER_Role.user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Only user can booked');
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found');
  }

  const result = await BookingServices.createBookingIntoDB(req.body, user.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking is created successfully',
    data: result,
  });
});
const getAllBooking: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await BookingServices.getAllBookingFromDB();
  if (result.length === 0) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No data found',
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Facilities retrieved successfully',
      data: result,
    });
  }
});

const getUserBooking: RequestHandler = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    // checking token
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You're not Authorized");
    }
  
    // checking if the valid token
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { role, email } = decoded;
  
    if (role !== USER_Role.user) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Only user can booked');
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'user not found');
    }
  const result = await BookingServices.getUserBookingFromDB(user.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking is retrieved successfully',
    data: result,
  });
};
const deleteBooking: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const result = await BookingServices.deleteBookingFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking canceled successfully',
    data: result,
  });
};

export const BookingControllers = {
  createBooking,
  getAllBooking,
  getUserBooking,
  deleteBooking,
};
