import { ReactNode } from "react";

import { Option } from "components/SelectWrapper";
import { DatesProps } from "types";

export type BookingContextProps = {
  children?: ReactNode;
};

export type BookingDataProps = {
  date: DatesProps[];
  selectAdults: Option;
  selectChildren: Option;
};

export type BookingContextData = {
  bookings: BookingDataProps[];
  handleSaveBooking: (option: BookingDataProps) => void;
};
