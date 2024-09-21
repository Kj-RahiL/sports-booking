import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { checkAvailabilityService } from "./checkAvailabity.service";


export const checkAvailabilityController = catchAsync(async(req,res,next)=>{

    const result = await checkAvailabilityService(req.query)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Availability checked successfully",
        data: result,
      });
    
})
