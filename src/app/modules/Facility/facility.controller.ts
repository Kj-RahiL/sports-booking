import { RequestHandler } from 'express';
import { createFacilityValidationSchema } from './facility.validation';
import { FacilityServices } from './facility.service';
import { TFacility } from './facility.interface';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createFacility: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await FacilityServices.createFacilityIntoDB(facility);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product is created successfully',
    data: result,
  });
});
const getAllFacility: RequestHandler = catchAsync(async (req, res, next) => {

    const result = await FacilityServices.getAllFacilityFromDB({ isDeleted: false })
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Facilities retrieved successfully',
        data: result,
      });
})
const getSingleFacility: RequestHandler = async (req, res, next) => {
    const {id} = req.params
    const result = await FacilityServices.getSingleFacilityFromDB(id)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Facility is retrieved successfully',
        data: result,
      });
};
const updateFacility: RequestHandler = async (req, res, next) => {
    const {id} = req.params
    const {facility} = req.body 
    const result = await FacilityServices.updateFacilityIntoDB(id, facility)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Facility updated successfully',
        data: result,
      });
};
const deleteFacility: RequestHandler = async (req, res, next) => {
    const {id } = req.params
    const result = await FacilityServices.deleteFacilityFromDB(id)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Facility deleted successfully',
        data: result,
      });

};

export const FacilityControllers = {
  createFacility,
  getAllFacility,
  getSingleFacility,
  updateFacility,
  deleteFacility,
};
