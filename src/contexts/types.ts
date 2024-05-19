import { ReactNode } from "react";

import { Option } from "components/SelectWrapper";
import { Value } from "react-multi-date-picker";

import { PlaceSelectOption, SelectOption } from "types";

export type BookingContextProps = {
  children?: ReactNode;
};

export type BookingDataProps = {
  id?: string;
  date: Value;
  selectPlace: Option<PlaceSelectOption>;
  selectAdults: Option<SelectOption>;
  selectChildren: Option<SelectOption>;
};

export type BookingContextData = {
  bookings: BookingDataProps[];
  showUpdateModal: boolean;
  handleBooking: (option: BookingDataProps) => void;
  handleShowModal: () => void;
  handleDeleteReservation: (id: BookingDataProps["id"]) => void;
};
