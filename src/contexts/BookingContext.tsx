import {
  createContext,
  ReactElement,
  useContext,
  useCallback,
  useState,
} from "react";

import {
  BookingContextData,
  BookingContextProps,
  BookingDataProps,
} from "./types";

export const BookingContext = createContext<BookingContextData>(
  {} as BookingContextData
);

export const BookingProvider = ({
  children,
}: BookingContextProps): ReactElement => {
  const [bookings, setBookings] = useState<BookingDataProps[]>([]);

  const handleSaveBooking = useCallback((bookingData: BookingDataProps) => {
    setBookings((prevState) => [...prevState, bookingData]);
  }, []);

  return (
    <BookingContext.Provider
      value={{
        bookings,
        handleSaveBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextData => useContext(BookingContext);
