import { model, Schema } from 'mongoose';
import { TFacility } from './facility.interface';

const facilitySchema = new Schema<TFacility>(
  {
    name: { type: String, required: [true, 'Facility name is required'] },
    description: { type: String, required: [true ,'Description is required'] },
    pricePerHour: { type: Number, required: [true , 'Price per hour must be greater than zero'] },
    location: { type: String, required: [true, 'Location is required'] },
    isDeleted: { type: Boolean, default: false },
  }
);

facilitySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facilitySchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facilitySchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

facilitySchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Facility.findOne({ id });
  return existingUser;
};

export const Facility = model<TFacility>('Facility', facilitySchema);
