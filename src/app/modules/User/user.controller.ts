import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";


const createAdmin = catchAsync(async (req, res) => {
  const result = await UserServices.createAdminIntoDB(req.body);

 sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'user created successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.updateUser(userId, req.body);

  sendResponse(res,{
    statusCode: 200,
    success: true,
    message: "User updated successfully!",
    data: result,
  });
});

export const userControllers = {
  createAdmin,
  updateUser,
};