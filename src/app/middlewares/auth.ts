import httpStatus from 'http-status';
import AppError from '../errors/appError';
import { USER_Role } from '../modules/User/user.constant';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/User/user.model';
import { NextFunction, Request, Response } from 'express';

const Auth = (...requiredRoles: (keyof typeof USER_Role)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split(' ')[1];

    // console.log('to tok token',token);
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

    // checking existing user
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'User not found');
    }

    if (!requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized to access this route',
      );
    }
    next();
  });
};

export default Auth;
