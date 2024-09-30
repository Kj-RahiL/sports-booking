import httpStatus from "http-status";
import AppError from "../errors/appError";
import config from "../config";
import { USER_Role } from "../modules/User/user.constant";
import { User } from "../modules/User/user.model";
import jwt, { JwtPayload } from 'jsonwebtoken';

export const getUser = async (token: string)=>{
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
      return user
}