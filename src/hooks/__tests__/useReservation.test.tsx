import { ReactElement } from "react";
import { renderHook } from "@testing-library/react-hooks";
import { DateObject } from "react-multi-date-picker";

import { useReservation } from "hooks/useReservation";
import { BookingContext } from "contexts";
import {
  dropdownAdultsMock,
  dropdownChildrenMock,
  placesMock,
} from "__fixtures__/dropdownMock";
import { showToastMessage } from "helpers/toast";

vi.mock("helpers/toast", async (importOriginal) => {
  const actual = (await importOriginal()) as typeof importOriginal;

  return {
    ...actual,
    showToastMessage: vi.fn(),
  };
});

type WrapperProps = {
  children: ReactElement;
};

const bookingData = [
  {
    id: "1",
    date: [new DateObject("2024-01-01"), new DateObject("2024-01-02")],
    selectPlace: placesMock[0],
    selectAdults: dropdownAdultsMock[0],
    selectChildren: dropdownChildrenMock[0],
  },
  {
    id: "2",
    date: [new DateObject("2024-02-01"), new DateObject("2024-02-02")],
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

const props = {
  place: null,
  adults: null,
  children: null,
  defaultDate: [],
  reservationId: "",
};

const setup = (defaultProps = props) => {
  return renderHook(() => useReservation({ ...defaultProps }), {
    wrapper: ({ children }: WrapperProps) => (
      <BookingContext.Provider value={{ ...providerProps }}>
        {children}
      </BookingContext.Provider>
    ),
  });
};

describe("useReservation hook", () => {
  it("should clear all filters when handleClearFilters is called", async () => {
    const { result } = setup();

    await result.current.handleClearFilters();

    expect(result.current.date).toBeNull();
    expect(result.current.selectPlace).toBeNull();
    expect(result.current.selectAdults).toBeNull();
    expect(result.current.selectChildren).toBeNull();
  });

  it("should set the adults when handleSelectAdults is called", async () => {
    const { result } = setup();

    await result.current.handleSelectAdults({ label: "1", value: "1" });

    expect(result.current.selectAdults).toStrictEqual({
      label: "1",
      value: "1",
    });
  });

  it("should set the children when handleSelectChildren is called", async () => {
    const { result } = setup();

    await result.current.handleSelectChildren({ label: "1", value: "1" });

    expect(result.current.selectChildren).toStrictEqual({
      label: "1",
      value: "1",
    });
  });

  it("should set the place when handleSelectPlace is called", async () => {
    const { result } = setup();

    await result.current.handleSelectPlace({
      label: "test",
      value: "1",
      pricePerDay: 100,
    });

    expect(result.current.selectPlace).toStrictEqual({
      label: "test",
      value: "1",
      pricePerDay: 100,
    });
  });

  it("should set the date when handleBookingDates is called", async () => {
    const { result } = setup();

    const date = [new DateObject("2024-04-01"), new DateObject("2024-04-02")];

    await result.current.handleBookingDates(date);

    expect(result.current.date).toStrictEqual(date);
  });

  it("should reset the date when handleBookingDates is called with a date already reserved", async () => {
    const { result } = setup();

    const date = [new DateObject("2024-01-01"), new DateObject("2024-01-02")];

    await result.current.handleBookingDates(date);

    expect(result.current.date).toStrictEqual([]);

    expect(showToastMessage).toHaveBeenCalled();
  });

  it("should update a reservation when handleUpdateBookingDates is called and there is only one reservation", async () => {
    const { result } = setup();

    const newDate = [
      new DateObject("2024-03-01"),
      new DateObject("2024-03-02"),
    ];

    await result.current.handleUpdateBookingDates(newDate);

    expect(result.current.date).toStrictEqual(newDate);
  });

  it("should update a reservation when handleUpdateBookingDates is called and there are more than one reservation", async () => {
    const defaultProps = {
      ...props,
      reservationId: "1",
    };

    const { result } = setup(defaultProps);

    const newDate = [
      new DateObject("2024-03-01"),
      new DateObject("2024-03-02"),
    ];

    await result.current.handleUpdateBookingDates(newDate);

    expect(result.current.date).toStrictEqual(newDate);
  });

  it("should call handleBooking when handleConfirm is called", async () => {
    const date = [new DateObject("2024-04-01"), new DateObject("2024-04-02")];

    const { result } = setup();

    await result.current.handleSelectAdults({ label: "1", value: "1" });
    await result.current.handleSelectChildren({ label: "1", value: "1" });
    await result.current.handleSelectPlace({
      label: "test",
      value: "1",
      pricePerDay: 100,
    });

    await result.current.handleBookingDates(date);

    await result.current.handleConfirm();

    expect(providerProps.handleBooking).toHaveBeenCalledOnce();

    expect(showToastMessage).toHaveBeenCalled();
  });

  it("should call showToastMessage when handleConfirm is called without to fill all the required fields", async () => {
    const { result } = setup();

    await result.current.handleConfirm();

    expect(showToastMessage).toHaveBeenCalled();
  });
});
