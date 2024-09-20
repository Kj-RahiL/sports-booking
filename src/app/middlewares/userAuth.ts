import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/appError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { USER_Role } from '../modules/User/user.constant';
import { User } from '../modules/User/user.model';
import config from '../config';

const userAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Extract token from authorization header
    const token = req.headers.authorization?.split(' ')[1];

    // Check if token exists
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You're not Authorized");
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { role, email } = decoded;

    // Check if user role is 'user'
    if (role !== USER_Role.user) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Only user can book');
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    // Attach user to request object for further use
    req.user = user;

    // Proceed to the next middleware or controller
    next();
  } catch (error) {
    next(error);
  }
};

export default userAuthMiddleware;
