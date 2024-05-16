import { ReactNode } from "react";

import { Option } from "components/SelectWrapper";
import { Value } from "react-multi-date-picker";

export type BookingContextProps = {
  children?: ReactNode;
};

export type BookingDataProps = {
  date: Value;
  selectAdults: Option;
  selectChildren: Option;
};

export type BookingContextData = {
  bookings: BookingDataProps[];
  menuIsOpen: boolean;
  openMenu: () => void;
  handleSaveBooking: (option: BookingDataProps) => void;
};
