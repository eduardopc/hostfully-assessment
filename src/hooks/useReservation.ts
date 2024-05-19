import { useState } from "react";
import { DateObject, Value } from "react-multi-date-picker";

import { useBooking } from "contexts";
import { Option } from "components/SelectWrapper";
import { isBookingDateRangeAvailable, showToastMessage } from "helpers";
import { GENERAL } from "languages";
import { PlaceSelectOption, SelectOption } from "types";

export type UseReservationParams = {
  place?: Option<PlaceSelectOption>;
  adults?: Option<SelectOption>;
  children?: Option<SelectOption>;
  defaultDate?: Value;
  reservationId?: string;
};

export type UseReservationReturn = Readonly<{
  date: Value;
  selectPlace: Option<PlaceSelectOption>;
  selectAdults: Option<SelectOption>;
  selectChildren: Option<SelectOption>;
  handleConfirm: () => void;
  handleSelectPlace: (place: Option<PlaceSelectOption>) => void;
  handleClearFilters: () => void;
  handleSelectAdults: (option: Option<SelectOption>) => void;
  handleBookingDates: (date: DateObject[]) => void;
  handleSelectChildren: (option: Option<SelectOption>) => void;
  handleUpdateBookingDates: (updatedDate: DateObject[]) => void;
}>;

export const useReservation = ({
  place = null,
  adults = null,
  children = null,
  defaultDate = [],
  reservationId,
}: UseReservationParams): UseReservationReturn => {
  const [date, setDates] = useState<Value>(defaultDate);
  const [selectPlace, setSelectPlace] =
    useState<Option<PlaceSelectOption>>(place);
  const [selectAdults, setSelectAdults] =
    useState<Option<SelectOption>>(adults);
  const [selectChildren, setSelectChildren] =
    useState<Option<SelectOption>>(children);

  const { bookings, handleBooking } = useBooking();

  const handleSelectAdults = (option: Option<SelectOption>): void => {
    setSelectAdults(option);
  };

  const handleSelectChildren = (option: Option<SelectOption>): void => {
    setSelectChildren(option);
  };

  const handleSelectPlace = (place: Option<PlaceSelectOption>): void => {
    setSelectPlace(place);
  };

  const handleClearFilters = (): void => {
    setDates(null);
    setSelectPlace(null);
    setSelectAdults(null);
    setSelectChildren(null);
  };

  const handleBookingDates = (date: DateObject[]): void => {
    const [from, to] = date.toLocaleString().split(",");

    if (isBookingDateRangeAvailable(new Date(from), new Date(to), bookings)) {
      setDates(date);
    } else {
      setDates([]);
      showToastMessage({
        message: GENERAL.date_already_selected,
        type: "warning",
      });
    }
  };

  const handleUpdateBookingDates = (updatedDate: DateObject[]): void => {
    const [from, to] = updatedDate.toLocaleString().split(",");

    if (bookings.length === 1) {
      setDates(updatedDate);
      return;
    }

    const getAllOtherReservations = bookings
      .filter((value) => value.id !== reservationId)
      .map((booking) => {
        return booking;
      });

    if (
      isBookingDateRangeAvailable(
        new Date(from),
        new Date(to),
        getAllOtherReservations
      )
    ) {
      setDates(updatedDate);
    } else {
      setDates([]);
      showToastMessage({
        message: GENERAL.date_already_selected,
        type: "warning",
      });
    }
  };

  const handleConfirm = (): void => {
    if (
      !date?.toLocaleString().length ||
      !selectAdults ||
      !selectChildren ||
      !selectPlace
    ) {
      showToastMessage({ message: GENERAL.save_error_message, type: "error" });

      return;
    }

    handleBooking({
      id: reservationId,
      date,
      selectAdults,
      selectChildren,
      selectPlace,
    });

    showToastMessage({
      message: reservationId
        ? GENERAL.update_success_message
        : GENERAL.save_success_message,
      type: "success",
      onOpen: handleClearFilters,
    });
  };

  return {
    date,
    selectPlace,
    selectAdults,
    selectChildren,
    handleConfirm,
    handleSelectPlace,
    handleClearFilters,
    handleSelectAdults,
    handleBookingDates,
    handleSelectChildren,
    handleUpdateBookingDates,
  };
};
