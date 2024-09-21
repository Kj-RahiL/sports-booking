import { Booking } from "../Booking/booking.model";
import moment from 'moment'

export const checkAvailabilityService = async(date:any) => {
  const requestedDate = date ? moment(date as string, 'YYYY-MM-DD') : moment();

  // 2. Retrieve bookings for the specified date from the database
  const bookings = await Booking.find({
    date: requestedDate.format('YYYY-MM-DD'),
  });

  // 3. Define total available time slots for the day (e.g., 08:00 to 20:00)
  const fullDaySlots = [
    { startTime: '08:00', endTime: '10:00' },
    { startTime: '10:00', endTime: '12:00' },
    { startTime: '12:00', endTime: '14:00' },
    { startTime: '14:00', endTime: '16:00' },
    { startTime: '16:00', endTime: '18:00' },
    { startTime: '18:00', endTime: '20:00' },
  ];

  // 4. Remove booked time slots from the available slots
  const availableSlots = fullDaySlots.filter((slot) => {
    return !bookings.some((booking) => {
      // Check if the slot overlaps with any booked time range
      return (
        (slot.startTime >= booking.startTime &&
          slot.startTime < booking.endTime) ||
        (slot.endTime > booking.startTime && slot.endTime <= booking.endTime)
      );
    });
  });

  return availableSlots
};
