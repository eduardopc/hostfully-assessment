import { isWithinInterval } from "date-fns";

import { BookingDataProps } from "contexts/types";

export const isBookingDateRangeAvailable = (
  from: Date,
  to: Date,
  bookings: BookingDataProps[]
): boolean => {
  return !bookings.some(
    (booking) =>
      isWithinInterval(from, {
        start: booking.date[0].from,
        end: booking.date[0].to,
      }) ||
      isWithinInterval(to, {
        start: booking.date[0].from,
        end: booking.date[0].to,
      })
  );
};
