import AppError from '../../errors/appError';
import { TFacility } from './facility.interface';
import { Facility } from './facility.model';
import httpStatus from 'http-status';

const createFacilityIntoDB = async (payload: TFacility) => {
  const result = await Facility.create(payload);
  return result;
};

const getAllFacilityFromDB = async (query: Record<string, unknown>) => {
  const result = await Facility.find();
  return result;
};
const getSingleFacilityFromDB = async (id: string) => {
  const result = await Facility.findById(id);
  return result;
};
const updateFacilityIntoDB = async (
  id: string,
  payload: Partial<TFacility>,
) => {
  const result = await Facility.findByIdAndUpdate(id, [{ $set: payload }], {
    new: true,
  });
  return result;
};
const deleteFacilityFromDB = async (id: string) => {
  const isFacilityExist = await Facility.findById(id);

  if (!isFacilityExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This facility does not exist');
  }
  const deleteFacility = await Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!deleteFacility) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Student');
  }
  return deleteFacility;
};

export const FacilityServices = {
  createFacilityIntoDB,
  getAllFacilityFromDB,
  getSingleFacilityFromDB,
  updateFacilityIntoDB,
  deleteFacilityFromDB,
};
