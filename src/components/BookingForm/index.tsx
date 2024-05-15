import { ReactElement, useState } from "react";
import DatePicker from "react-multi-date-picker";
import { CalendarToday } from "@styled-icons/material-outlined";

import { Button } from "components/Button";
import { DATEPICKER, DROPDOWN, GENERAL } from "languages";
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
import { DatesProps } from "types";
import { isBookingDateRangeAvailable, showToastMessage } from "helpers";

type BookingFormProps = {
  formDirection: BookingFormStyleProps["$formDirection"];
};

export const BookingForm = ({
  formDirection,
}: BookingFormProps): ReactElement => {
  const [date, setDates] = useState<DatesProps[]>([]);
  const [selectAdults, setSelectAdults] = useState<Option>(null);
  const [selectChildren, setSelectChildren] = useState<Option>(null);

  const { bookings, handleSaveBooking } = useBooking();

  const handleBookingDates = ({ from, to }: DatesProps): void => {
    if (isBookingDateRangeAvailable(new Date(from), new Date(to), bookings)) {
      setDates((prevState) => [...prevState, { from, to }]);
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
    setDates([]);
    setSelectAdults(null);
    setSelectChildren(null);
  };

  const handleSave = (): void => {
    if (!date || !selectAdults || !selectChildren) {
      showToastMessage({ message: GENERAL.save_error_message, type: "error" });

      return;
    }

    handleSaveBooking({ date, selectAdults, selectChildren });
    showToastMessage({
      message: GENERAL.save_success_message,
      type: "success",
      onOpen: handleClearFilters,
    });
  };

  const showClearButton = date.length > 0 || selectAdults || selectChildren;
  const showSaveButton = date && selectAdults && selectChildren;

  return (
    <BookingFormWrapper $formDirection={formDirection}>
      <BookingFormSection $formDirection={formDirection}>
        <FormGroup>
          <DatePicker
            render={
              <Button icon={<CalendarToday />}>{DATEPICKER.dates}</Button>
            }
            hideOnScroll
            minDate={new Date()}
            calendarPosition="bottom"
            highlightToday={false}
            value={[date[0]?.from, date[0]?.to]}
            range
            dateSeparator={DATEPICKER.separator}
            onChange={(_, { validatedValue }) => {
              if (validatedValue.length > 1)
                handleBookingDates({
                  from: validatedValue[0],
                  to: validatedValue[1],
                });
            }}
          />
        </FormGroup>

        <SelectWrapper
          placeholder={DROPDOWN.adults}
          selectOptions={dropdownAdultsMock}
          defaultValue={selectAdults}
          onChange={handleSelectAdults}
        />

        <SelectWrapper
          placeholder={DROPDOWN.children}
          selectOptions={dropdownChildrenMock}
          defaultValue={selectChildren}
          onChange={handleSelectChildren}
        />
      </BookingFormSection>

      <BookingFormButtonsSection>
        {showClearButton && (
          <Button minimal onClick={handleClearFilters}>
            {GENERAL.clear_filters}
          </Button>
        )}
        {showSaveButton && (
          <Button minimal onClick={handleSave}>
            {GENERAL.save_button}
          </Button>
        )}
      </BookingFormButtonsSection>
    </BookingFormWrapper>
  );
};
