import { isWithinInterval } from "date-fns";

import { BookingDataProps } from "contexts/types";

export const isBookingDateRangeAvailable = (
  from: Date,
  to: Date,
  bookings: BookingDataProps[]
): boolean => {
  return !bookings.some((booking) => {
    if (!booking.date) return false;

    const [dateFrom, dateTo] = booking.date.toLocaleString().split(",");

    const fromDate = new Date(dateFrom);
    const toDate = new Date(dateTo);

    return (
      isWithinInterval(from, { start: fromDate, end: toDate }) ||
      isWithinInterval(to, { start: fromDate, end: toDate })
    );
  });
};
