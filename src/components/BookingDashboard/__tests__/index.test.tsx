import { DateObject } from "react-multi-date-picker";
import { RenderResult, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithTheme } from "utils/tests/helpers";
import { BookingDashboard } from "..";
import { BookingContext } from "contexts";
import {
  dropdownAdultsMock,
  dropdownChildrenMock,
  placesMock,
} from "__fixtures__/dropdownMock";
import { DASHBOARD } from "languages";

const bookingData = [
  {
    id: "1",
    date: [new DateObject("2024-01-01"), new DateObject("2024-01-02")],
    selectPlace: placesMock[0],
    selectAdults: dropdownAdultsMock[0],
    selectChildren: dropdownChildrenMock[0],
  },
];

const providerProps = {
  bookings: bookingData,
  showUpdateModal: false,
  handleBooking: vi.fn(),
  handleShowModal: vi.fn(),
  handleDeleteReservation: vi.fn(),
};

const setup = (): RenderResult =>
  renderWithTheme(
    <BookingContext.Provider value={providerProps}>
      <BookingDashboard />
    </BookingContext.Provider>
  );

describe("<BookingDashboard />", () => {
  it("should render the booking dashboard table", () => {
    setup();

    expect(screen.getByRole("table")).toBeDefined();

    expect(
      screen.getByRole("columnheader", { name: DASHBOARD.table_header.date })
    ).toBeDefined();

    expect(
      screen.getByRole("columnheader", { name: DASHBOARD.table_header.adults })
    ).toBeDefined();

    expect(
      screen.getByRole("columnheader", {
        name: DASHBOARD.table_header.children,
      })
    ).toBeDefined();

    expect(
      screen.getByRole("columnheader", { name: DASHBOARD.table_header.place })
    ).toBeDefined();

    expect(
      screen.getByRole("columnheader", { name: DASHBOARD.table_header.total })
    ).toBeDefined();
  });

  it("should render the booking dashboard data", () => {
    setup();

    expect(
      screen.getByRole("cell", { name: bookingData[0].selectAdults?.label })
    ).toBeDefined();

    expect(
      screen.getByRole("cell", { name: bookingData[0].selectChildren?.label })
    ).toBeDefined();

    expect(
      screen.getByRole("cell", { name: bookingData[0].selectPlace?.label })
    ).toBeDefined();

    expect(
      screen.getByRole("cell", {
        name: `${bookingData[0].date[0]} - ${bookingData[0].date[1]}`,
      })
    ).toBeDefined();
  });

  it("should show the action buttons", () => {
    setup();

    expect(screen.getByTestId("delete-reservation")).toBeDefined();

    expect(screen.getByTestId("edit-reservation")).toBeDefined();
  });

  it("should call handleDeleteReservation when clicked in the trash button", async () => {
    setup();

    userEvent.click(screen.getByTestId("delete-reservation"));

    await waitFor(() => {
      expect(providerProps.handleDeleteReservation).toBeCalled();
    });
  });

  it("should call handleShowModal when clicked in the edit button", async () => {
    setup();

    userEvent.click(screen.getByTestId("edit-reservation"));

    await waitFor(() => {
      expect(providerProps.handleShowModal).toBeCalled();
    });
  });
});
