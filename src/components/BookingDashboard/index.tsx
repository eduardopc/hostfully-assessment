import { ReactElement, useState } from "react";
import { TrashCan, Edit } from "@styled-icons/fa-regular";

import Heading from "components/Heading";
import { DASHBOARD } from "languages";
import { useBooking } from "contexts";

import * as S from "./styles";
import { BookingDataProps } from "contexts/types";
import { Modal } from "components/Modal";
import { BookingForm } from "components/BookingForm";

export const BookingDashboard = (): ReactElement => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [bookingBeingUpdated, setBookingBeingUpdated] =
    useState<BookingDataProps>();

  const { bookings, handleDeleteReservation } = useBooking();

  const handleShowModal = () => {
    setShowUpdateModal((prevState) => !prevState);
  };

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
        title={"Update reservation"}
        onCancelButton={handleShowModal}
      >
        <BookingForm
          formDirection="column"
          defaultDate={bookingBeingUpdated?.date}
          adults={bookingBeingUpdated?.selectAdults}
          children={bookingBeingUpdated?.selectChildren}
        />
      </Modal>
    </>
  );
};
