import { ReactNode } from "react";

import { Option } from "components/SelectWrapper";
import { Value } from "react-multi-date-picker";

export type BookingContextProps = {
  children?: ReactNode;
};

export type BookingDataProps = {
  id?: number;
  date: Value;
  selectAdults: Option;
  selectChildren: Option;
};

export type BookingContextData = {
  bookings: BookingDataProps[];
  handleSaveBooking: (option: BookingDataProps) => void;
  handleDeleteReservation: (id: BookingDataProps["id"]) => void;
};
