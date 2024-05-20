import { DateObject } from "react-multi-date-picker";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithTheme } from "utils/tests/helpers";
import { BookingForm } from "..";
import { BookingFormStyleProps } from "../styles";
import { GENERAL } from "languages";
import { showToastMessage } from "helpers";
import { BookingContext } from "contexts";

vi.mock("helpers/toast", async (importOriginal) => {
  const actual = (await importOriginal()) as typeof importOriginal;

  return {
    ...actual,
    showToastMessage: vi.fn(),
  };
});

const providerProps = {
  bookings: [],
  showUpdateModal: false,
  handleBooking: vi.fn(),
  handleShowModal: vi.fn(),
  handleDeleteReservation: vi.fn(),
};

const props = {
  formDirection: "row" as BookingFormStyleProps["$formDirection"],
};

describe("<BookingForm />", () => {
  it("should render the whole form in its initial state", () => {
    renderWithTheme(<BookingForm {...props} />);

    expect(screen.getByText(GENERAL.date_picker.dates)).toBeDefined();

    expect(screen.getByText(GENERAL.dropdown.adults)).toBeDefined();

    expect(screen.getByText(GENERAL.dropdown.children)).toBeDefined();

    expect(screen.getByText(GENERAL.dropdown.place)).toBeDefined();
  });

  it("should render the clear filters button when one filter is filled", () => {
    const defaultProps = {
      ...props,
      defaultDate: [new DateObject("2024-01-01"), new DateObject("2024-01-02")],
    };

    renderWithTheme(<BookingForm {...defaultProps} />);

    expect(screen.getByText(GENERAL.clear_filters)).toBeDefined();
  });

  it("should not render the clear filters button when one filter is filled but there is a reservationId", () => {
    const defaultProps = {
      ...props,
      defaultDate: [new DateObject("2024-01-01"), new DateObject("2024-01-02")],
      reservationId: "1",
    };

    renderWithTheme(<BookingForm {...defaultProps} />);

    expect(screen.queryByText(GENERAL.clear_filters)).toBeNull();
  });

  it("should render the save button when all filters are filled", () => {
    const defaultProps = {
      ...props,
      defaultDate: [new DateObject("2024-01-01"), new DateObject("2024-01-02")],
      place: {
        label: "Test",
        value: "test",
      },
      adults: {
        label: "Test",
        value: "test",
      },
      children: {
        label: "Test",
        value: "test",
      },
      confirmTextButton: "Save",
    };

    renderWithTheme(<BookingForm {...defaultProps} />);

    expect(screen.getByText(defaultProps.confirmTextButton)).toBeDefined();
  });

  it("should render the save button when the reservationId is filled", () => {
    const defaultProps = {
      ...props,
      reservationId: "1",
    };

    renderWithTheme(<BookingForm {...defaultProps} />);

    expect(screen.getByText(GENERAL.save_button)).toBeDefined();
  });

  it("should clear all filters when the clear button is clicked", async () => {
    const defaultProps = {
      ...props,
      defaultDate: [new DateObject("2024-01-01"), new DateObject("2024-01-02")],
      place: {
        label: "Test",
        value: "test",
      },
      adults: {
        label: "Test",
        value: "test",
      },
      children: {
        label: "Test",
        value: "test",
      },
      confirmTextButton: "Save",
    };

    renderWithTheme(<BookingForm {...defaultProps} />);

    userEvent.click(screen.getByText(GENERAL.clear_filters));

    await waitFor(() => {
      expect(screen.queryByText(defaultProps.confirmTextButton)).toBeNull();
    });

    expect(screen.getByText(GENERAL.date_picker.dates)).toBeDefined();

    expect(screen.getByText(GENERAL.dropdown.adults)).toBeDefined();

    expect(screen.getByText(GENERAL.dropdown.children)).toBeDefined();

    expect(screen.getByText(GENERAL.dropdown.place)).toBeDefined();
  });

  it("should show toast message when the save button is clicked", async () => {
    const defaultProps = {
      ...props,
      defaultDate: [new DateObject("2024-01-01"), new DateObject("2024-01-02")],
      place: {
        label: "Test",
        value: "test",
      },
      adults: {
        label: "Test",
        value: "test",
      },
      children: {
        label: "Test",
        value: "test",
      },
      confirmTextButton: "Save",
    };

    renderWithTheme(
      <BookingContext.Provider value={{ ...providerProps }}>
        <BookingForm {...defaultProps} />
      </BookingContext.Provider>
    );

    userEvent.click(screen.getByText(defaultProps.confirmTextButton));

    await waitFor(() => {
      expect(showToastMessage).toHaveBeenCalled();
    });
  });
});
