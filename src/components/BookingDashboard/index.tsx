import { ReactElement } from "react";
import { TrashCan, Edit } from "@styled-icons/fa-regular";

import Heading from "components/Heading";
import { DASHBOARD } from "languages";
import { useBooking } from "contexts";

import * as S from "./styles";

export const BookingDashboard = (): ReactElement => {
  const { bookings, handleDeleteReservation } = useBooking();

  return (
    <S.BookingDashboardWrapper>
      <Heading lineLeft lineColor="primary">
        {DASHBOARD.title}
      </Heading>

      <S.Table>
        <thead>
          <tr>
            <th>{DASHBOARD.table_header.date}</th>
            <th>{DASHBOARD.table_header.adults}</th>
            <th>{DASHBOARD.table_header.children}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => {
            const dates = booking.date?.toLocaleString().split(",");

            return (
              <tr key={booking.id}>
                <td>
                  <S.Cell>{DASHBOARD.table_header.date}</S.Cell>
                  {`${dates?.[0]} - ${dates?.[1]}`}
                </td>
                <td>
                  <S.Cell>{DASHBOARD.table_header.adults}</S.Cell>
                  {booking.selectAdults?.label}
                </td>
                <td>
                  <S.Cell>{DASHBOARD.table_header.children}</S.Cell>
                  {booking.selectChildren?.label}
                </td>
                <td>
                  <S.ButtonsWrapper>
                    <S.Button
                      onClick={() => handleDeleteReservation(booking.id)}
                    >
                      <TrashCan size={24} />
                    </S.Button>
                    <S.Button>
                      <Edit size={24} />
                    </S.Button>
                  </S.ButtonsWrapper>
                </td>
              </tr>
            );
          })}
        </tbody>
      </S.Table>
    </S.BookingDashboardWrapper>
  );
};
