import { ReactNode } from "react";

import { Option } from "components/SelectWrapper";
import { Value } from "react-multi-date-picker";

export type BookingContextProps = {
  children?: ReactNode;
};

export type BookingDataProps = {
  id?: string;
  date: Value;
  selectAdults: Option;
  selectChildren: Option;
};

export type BookingContextData = {
  bookings: BookingDataProps[];
  showUpdateModal: boolean;
  handleBooking: (option: BookingDataProps) => void;
  handleShowModal: () => void;
  handleDeleteReservation: (id: BookingDataProps["id"]) => void;
};
