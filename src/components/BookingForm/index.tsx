import { ReactElement, useState } from "react";
import DatePicker, { DateObject, Value } from "react-multi-date-picker";
import { CalendarToday } from "@styled-icons/material-outlined";

import { Button } from "components/Button";
import { GENERAL } from "languages";
import { useBooking } from "contexts";
import { FormGroup } from "components/FormGroup";

import {
  dropdownAdultsMock,
  dropdownChildrenMock,
} from "__fixtures__/dropdownMock";
import { Option, SelectWrapper } from "components/SelectWrapper";
import {
  BookingFormButtonsSection,
  BookingFormSection,
  BookingFormStyleProps,
  BookingFormWrapper,
} from "./styles";
import { isBookingDateRangeAvailable, showToastMessage } from "helpers";

type BookingFormProps = {
  adults?: Option;
  children?: Option;
  defaultDate?: Value;
  reservationId?: string;
  formDirection: BookingFormStyleProps["$formDirection"];
  confirmTextButton?: string;
};

export const BookingForm = ({
  adults = null,
  children = null,
  defaultDate = [],
  reservationId,
  formDirection,
  confirmTextButton = GENERAL.save_button,
}: BookingFormProps): ReactElement => {
  const [date, setDates] = useState<Value>(defaultDate);
  const [selectAdults, setSelectAdults] = useState<Option>(adults);
  const [selectChildren, setSelectChildren] = useState<Option>(children);

  const { bookings, handleBooking } = useBooking();

  const isEditingReservation = !!reservationId;
  const allFieldsFilled =
    date?.toLocaleString().length || selectAdults || selectChildren;
  const showSaveButton =
    isEditingReservation || (date && selectAdults && selectChildren);

  const handleBookingDates = (date: DateObject[]): void => {
    const [from, to] = date.toLocaleString().split(",");

    if (isBookingDateRangeAvailable(new Date(from), new Date(to), bookings)) {
      setDates(date);
    } else {
      setDates([]);
      showToastMessage({
        message: GENERAL.date_already_selected,
        type: "warning",
      });
    }
  };

  const handleUpdateBookingDates = (updatedDate: DateObject[]): void => {
    const [from, to] = updatedDate.toLocaleString().split(",");

    if (bookings.length === 1) {
      setDates(updatedDate);
      return;
    }

    const getAllOtherReservations = bookings
      .filter((value) => value.id !== reservationId)
      .map((booking) => {
        return booking;
      });

    if (
      isBookingDateRangeAvailable(
        new Date(from),
        new Date(to),
        getAllOtherReservations
      )
    ) {
      setDates(updatedDate);
    } else {
      setDates([]);
      showToastMessage({
        message: GENERAL.date_already_selected,
        type: "warning",
      });
    }
  };

  const handleSelectAdults = (option: Option): void => {
    setSelectAdults(option);
  };

  const handleSelectChildren = (option: Option): void => {
    setSelectChildren(option);
  };

  const handleClearFilters = (): void => {
    setDates(null);
    setSelectAdults(null);
    setSelectChildren(null);
  };

  const handleConfirm = (): void => {
    if (!date?.toLocaleString().length || !selectAdults || !selectChildren) {
      showToastMessage({ message: GENERAL.save_error_message, type: "error" });

      return;
    }

    handleBooking({ id: reservationId, date, selectAdults, selectChildren });

    showToastMessage({
      message: isEditingReservation
        ? GENERAL.update_success_message
        : GENERAL.save_success_message,
      type: "success",
      onOpen: handleClearFilters,
    });
  };

  return (
    <BookingFormWrapper $formDirection={formDirection}>
      <BookingFormSection $formDirection={formDirection}>
        <FormGroup>
          <DatePicker
            render={
              <Button icon={<CalendarToday />}>
                {GENERAL.date_picker.dates}
              </Button>
            }
            hideOnScroll
            minDate={new DateObject()}
            calendarPosition="bottom"
            value={date}
            highlightToday={false}
            range
            dateSeparator={GENERAL.date_picker.separator}
            onChange={(date: DateObject[], { validatedValue }) => {
              if (validatedValue.length > 1)
                isEditingReservation
                  ? handleUpdateBookingDates(date)
                  : handleBookingDates(date);
            }}
          />
        </FormGroup>

        <SelectWrapper
          placeholder={GENERAL.dropdown.adults}
          selectOptions={dropdownAdultsMock}
          defaultValue={selectAdults}
          showFullWidth={isEditingReservation}
          onChange={handleSelectAdults}
        />

        <SelectWrapper
          placeholder={GENERAL.dropdown.children}
          selectOptions={dropdownChildrenMock}
          defaultValue={selectChildren}
          showFullWidth={isEditingReservation}
          onChange={handleSelectChildren}
        />
      </BookingFormSection>

      <BookingFormButtonsSection $openedFromModal={isEditingReservation}>
        {!isEditingReservation && allFieldsFilled && (
          <Button minimal onClick={handleClearFilters}>
            {GENERAL.clear_filters}
          </Button>
        )}
        {showSaveButton && (
          <Button minimal={!isEditingReservation} onClick={handleConfirm}>
            {confirmTextButton}
          </Button>
        )}
      </BookingFormButtonsSection>
    </BookingFormWrapper>
  );
};
