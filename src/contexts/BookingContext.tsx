import {
  createContext,
  ReactElement,
  useContext,
  useCallback,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";

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
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [bookings, setBookings] = useState<BookingDataProps[]>([]);

  const openMenu = useCallback((): void => {
    setMenuIsOpen((prevState) => !prevState);
  }, []);

  const handleSaveBooking = useCallback((bookingData: BookingDataProps) => {
    setBookings((prevState) => [
      ...prevState,
      { ...bookingData, id: uuidv4() },
    ]);
  }, []);

  return (
    <BookingContext.Provider
      value={{
        bookings,
        menuIsOpen,
        openMenu,
        handleSaveBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextData => useContext(BookingContext);
