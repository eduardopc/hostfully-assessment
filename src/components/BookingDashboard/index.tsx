import { ReactElement, useState } from "react";
import { TrashCan, Edit } from "@styled-icons/fa-regular";

import Heading from "components/Heading";
import { DASHBOARD, GENERAL } from "languages";
import { useBooking } from "contexts";

import * as S from "./styles";
import { BookingDataProps } from "contexts/types";
import { Modal } from "components/Modal";
import { BookingForm } from "components/BookingForm";
import { getReservationCost } from "helpers";

export const BookingDashboard = (): ReactElement => {
  const [bookingBeingUpdated, setBookingBeingUpdated] =
    useState<BookingDataProps>();

  const {
    bookings,
    showUpdateModal,
    handleShowModal,
    handleDeleteReservation,
  } = useBooking();

  const handleUpdateModal = (booking: BookingDataProps) => {
    setBookingBeingUpdated(booking);
    handleShowModal();
  };

  return (
    <>
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
              <th>{DASHBOARD.table_header.place}</th>
              <th>{DASHBOARD.table_header.total}</th>
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
                    <S.Cell>{DASHBOARD.table_header.place}</S.Cell>
                    {booking.selectPlace?.label}
                  </td>
                  <td>
                    <S.Cell>{DASHBOARD.table_header.total}</S.Cell>
                    {getReservationCost({
                      dates,
                      pricePerDay: booking.selectPlace?.pricePerDay,
                    })}
                  </td>
                  <td>
                    <S.ButtonsWrapper>
                      <S.Button
                        onClick={(): void =>
                          handleDeleteReservation(booking.id)
                        }
                      >
                        <TrashCan size={24} />
                      </S.Button>
                      <S.Button onClick={() => handleUpdateModal(booking)}>
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

      <Modal
        visible={showUpdateModal}
        title={GENERAL.update_reservation}
        onCancelButton={handleShowModal}
      >
        <BookingForm
          adults={bookingBeingUpdated?.selectAdults}
          children={bookingBeingUpdated?.selectChildren}
          defaultDate={bookingBeingUpdated?.date}
          place={bookingBeingUpdated?.selectPlace}
          formDirection="column"
          reservationId={bookingBeingUpdated?.id}
          confirmTextButton={GENERAL.update_button}
        />
      </Modal>
    </>
  );
};
