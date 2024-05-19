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
import { showToastMessage } from "helpers";
import { GENERAL } from "languages";

export const BookingContext = createContext<BookingContextData>(
  {} as BookingContextData
);

export const BookingProvider = ({
  children,
}: BookingContextProps): ReactElement => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [bookings, setBookings] = useState<BookingDataProps[]>([]);

  const handleShowModal = useCallback(() => {
    setShowUpdateModal((prevState) => !prevState);
  }, []);

  const handleBooking = useCallback(
    (bookingData: BookingDataProps) => {
      if (showUpdateModal) handleShowModal();

      if (bookingData.id) {
        setBookings((prevState) =>
          prevState.map((booking) =>
            booking.id === bookingData.id ? bookingData : booking
          )
        );

        return;
      }

      setBookings((prevState) => [
        ...prevState,
        { ...bookingData, id: uuidv4() },
      ]);
    },
    [showUpdateModal, handleShowModal]
  );

  const handleDeleteReservation = useCallback((id: BookingDataProps["id"]) => {
    setBookings((prevState) =>
      prevState.filter((booking) => booking.id !== id)
    );
    showToastMessage({
      message: GENERAL.delete_reservation,
      type: "success",
    });
  }, []);

  return (
    <BookingContext.Provider
      value={{
        bookings,
        showUpdateModal,
        handleBooking,
        handleShowModal,
        handleDeleteReservation,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextData => useContext(BookingContext);
