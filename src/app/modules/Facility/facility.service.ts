import { TFacility } from './facility.interface';
import { Facility } from './facility.model';

const createFacilityIntoDB = async (payload:TFacility) => {
    const result = await Facility.create(payload)
    return result;
};

const getAllFacilityFromDB = async (query: Record<string, unknown>) => {
    const result = await Facility.find()
    return result
};
const getSingleFacilityFromDB = async (id: String) => {
    const result = await Facility.findById(id)
    return result
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
    const result = await Facility.findByIdAndDelete(id);
  return result;
};

export const FacilityServices = {
  createFacilityIntoDB,
  getAllFacilityFromDB,
  getSingleFacilityFromDB,
  updateFacilityIntoDB,
  deleteFacilityFromDB,
};
