import { Types } from 'mongoose';

export type TBooking = {
  date: string;
  startTime: string;
  endTime: string;
  user: Types.ObjectId;
  facility: Types.ObjectId;
  payableAmount: number;
  transactionId: string;
  isBooked: 'confirmed' | 'unconfirmed' | 'canceled';
  paymentStatus: 'pending' | 'paid' | 'canceled';
};
