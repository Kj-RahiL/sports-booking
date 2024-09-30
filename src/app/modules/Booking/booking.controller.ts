import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { BookingServices } from './booking.service';

const createBooking: RequestHandler = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  // checking token

  const result = await BookingServices.createBookingIntoDB(req.body, token!);

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

  const result = await BookingServices.getUserBookingFromDB(token!);
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
