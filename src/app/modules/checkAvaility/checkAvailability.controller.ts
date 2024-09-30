import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { checkAvailabilityService } from './checkAvailabity.service';

export const checkAvailabilityController = catchAsync(
  async (req, res, next) => {
    const {date, facility} = req.query
    const result = await checkAvailabilityService(date, facility);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Availability checked successfully',
      data: result,
    });
  },
);
