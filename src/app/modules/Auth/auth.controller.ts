import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/appError';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { User } from '../User/user.model';
import { AuthServices } from './auth.service';

const signup = catchAsync(async (req, res) => {
  const result = await AuthServices.signup(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User registered successfully!',
    data: result,
  });
});
const login = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await AuthServices.login(req.body);

  const user = await User.findOne({ email: req.body.email });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
  });
  res.status(201).json({
    statusCode: 200,
    success: true,
    message: 'User logged in successfully!',
    token: accessToken,
    data: user,
  });
});

export const AuthControllers = {
  signup,
  login,
};
