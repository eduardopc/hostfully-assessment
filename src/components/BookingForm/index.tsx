import { ReactElement } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { CalendarToday } from "@styled-icons/material-outlined";

import { Button } from "components/Button";
import { GENERAL } from "languages";
import { FormGroup } from "components/FormGroup";

import {
  dropdownAdultsMock,
  dropdownChildrenMock,
  placesMock,
} from "__fixtures__/dropdownMock";
import { SelectWrapper } from "components/SelectWrapper";
import {
  BookingFormButtonsSection,
  BookingFormSection,
  BookingFormStyleProps,
  BookingFormWrapper,
} from "./styles";
import { UseReservationParams, useReservation } from "hooks/useReservation";

type BookingFormProps = UseReservationParams & {
  formDirection: BookingFormStyleProps["$formDirection"];
  confirmTextButton?: string;
};

const US_DEFAULT_FORMAT = "MM/DD/YYYY";

export const BookingForm = ({
  place = null,
  adults = null,
  children = null,
  defaultDate = [],
  reservationId,
  formDirection,
  confirmTextButton = GENERAL.save_button,
}: BookingFormProps): ReactElement => {
  const {
    date,
    selectPlace,
    selectAdults,
    selectChildren,
    handleConfirm,
    handleSelectPlace,
    handleClearFilters,
    handleSelectAdults,
    handleBookingDates,
    handleSelectChildren,
    handleUpdateBookingDates,
  } = useReservation({
    place,
    adults,
    children,
    defaultDate,
    reservationId,
  });

  const isEditingReservation = !!reservationId;

  const allFieldsFilled =
    date?.toLocaleString().length ||
    selectAdults ||
    selectChildren ||
    selectPlace;

  const showSaveButton =
    isEditingReservation ||
    (date && selectAdults && selectChildren && selectPlace);

  return (
    <BookingFormWrapper $formDirection={formDirection}>
      <BookingFormSection $formDirection={formDirection}>
        <FormGroup>
          <DatePicker
            render={
              <Button icon={<CalendarToday />}>
                {date?.toLocaleString() || GENERAL.date_picker.dates}
              </Button>
            }
            hideOnScroll
            minDate={new DateObject()}
            calendarPosition="bottom"
            value={date}
            highlightToday={false}
            range
            format={US_DEFAULT_FORMAT}
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

        <SelectWrapper
          placeholder={GENERAL.dropdown.place}
          selectOptions={placesMock}
          defaultValue={selectPlace}
          showFullWidth={isEditingReservation}
          onChange={handleSelectPlace}
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
