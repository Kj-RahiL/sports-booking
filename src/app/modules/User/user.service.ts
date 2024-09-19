import { TUser } from "./user.interface";
import { User } from "./user.model";

const createAdminIntoDB = async (payload: TUser) => {
    const admin = await User.create(payload);
    return admin;
  };
  const updateUser = async (id: string, payload: TUser) => {
    const admin = await User.findByIdAndUpdate(id, payload);
    return admin;
  };
  
  export const UserServices = {
    createAdminIntoDB,
    updateUser,
  };