import mongoose, { model, Schema } from 'mongoose';
import { TBooking } from './booking.interface';
import { TFacility } from '../Facility/facility.interface';

const bookingSchema = new Schema<TBooking>({
  date: {
    type: Date,
    required: true,
  },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'user id is required'],
    unique: true,
    ref: 'User',
  },
  facility: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Facility',
  },
  payableAmount: {
    type: Number,
    required: true,
  },
  isBooked: {
    type: String,
    enum: ['confirmed', 'unconfirmed', 'canceled'],
    default: 'unconfirmed',
  },
});

bookingSchema.pre('save', async function (next) {
  const booking = this as TBooking;
  const facility = await mongoose.model('Facility').findById(this.facility);
  if (!facility) {
    return next(new Error('Facility Not Found'));
  }
  const hours =
    (new Date(booking.endTime).getTime() -
      new Date(booking.startTime).getTime()) /
    (1000 * 60 * 60);
  booking.payableAmount = hours * facility.pricePerHour;
  next();
});

export const Booking = model<TFacility>('Booking', bookingSchema);
