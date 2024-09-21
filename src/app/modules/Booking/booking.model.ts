import mongoose, { model, Schema } from 'mongoose';
import { TBooking } from './booking.interface';
import { TFacility } from '../Facility/facility.interface';

const bookingSchema = new Schema<TBooking>({
  date: {
    type: String,
    required: true,
  },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  facility: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Facility',
  },
  payableAmount: {
    type: Number,
  },
  isBooked: {
    type: String,
    enum: ['confirmed', 'unconfirmed', 'canceled'],
    default: 'unconfirmed',
  },
});

bookingSchema.pre('save', async function (next) {
  const booking = this as TBooking;

  // Fetch facility to get pricePerHour
  const facility = await mongoose.model('Facility').findById(this.facility);
  if (!facility) {
    return next(new Error('Facility Not Found'));
  }

  // Parse startTime and endTime in "HH:mm" format
  const [startHours, startMinutes] = booking.startTime.split(':').map(Number);
  const [endHours, endMinutes] = booking.endTime.split(':').map(Number);

  // Calculate the duration in hours (as floating point number)
  const hours = endHours + endMinutes / 60 - (startHours + startMinutes / 60);

  if (hours <= 0) {
    return next(new Error('Invalid time range'));
  }

  // Calculate the payableAmount based on facility's pricePerHour
  booking.payableAmount = hours * facility.pricePerHour;

  next();
});

export const Booking = model<TBooking>('Booking', bookingSchema);
