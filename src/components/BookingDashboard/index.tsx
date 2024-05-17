import { ReactElement } from "react";

import Heading from "components/Heading";
import { DASHBOARD } from "languages";

import * as S from "./styles";
import { useBooking } from "contexts";

export const BookingDashboard = (): ReactElement => {
  const { bookings } = useBooking();

  return (
    <>
      <Heading lineLeft lineColor="primary">
        {DASHBOARD.title}
      </Heading>

      {bookings.map((booking) => {
        return (
          <S.Grid>
            <S.Wrapper>{booking.id}</S.Wrapper>
          </S.Grid>
        );
      })}
    </>
  );
};
