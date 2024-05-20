import { differenceInDays } from "date-fns";
import { GENERAL } from "languages";

import { PlaceSelectOption } from "types";

type GetReservationCostProps = {
  dates?: string[];
  pricePerDay: PlaceSelectOption["pricePerDay"];
};

export const getReservationCost = ({
  dates,
  pricePerDay,
}: GetReservationCostProps): string => {
  if (!dates || !pricePerDay) return GENERAL.remake_reservation;

  const days = differenceInDays(dates[1], dates[0]);

  return `$${days * pricePerDay}`;
};
