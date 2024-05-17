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
  formDirection: BookingFormStyleProps["$formDirection"];
};

export const BookingForm = ({
  formDirection,
}: BookingFormProps): ReactElement => {
  const [date, setDates] = useState<Value>([]);
  const [selectAdults, setSelectAdults] = useState<Option>(null);
  const [selectChildren, setSelectChildren] = useState<Option>(null);

  const { bookings, handleSaveBooking } = useBooking();

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

  const showClearButton =
    date?.toLocaleString().length || selectAdults || selectChildren;
  const showSaveButton = date && selectAdults && selectChildren;

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
            minDate={new Date()}
            calendarPosition="bottom"
            highlightToday={false}
            value={date}
            range
            dateSeparator={GENERAL.date_picker.separator}
            onChange={(date: DateObject[], { validatedValue }) => {
              if (validatedValue.length > 1) handleBookingDates(date);
            }}
          />
        </FormGroup>

        <SelectWrapper
          placeholder={GENERAL.dropdown.adults}
          selectOptions={dropdownAdultsMock}
          defaultValue={selectAdults}
          onChange={handleSelectAdults}
        />

        <SelectWrapper
          placeholder={GENERAL.dropdown.children}
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
