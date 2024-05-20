import {
  dropdownAdultsMock,
  dropdownChildrenMock,
  placesMock,
} from "__fixtures__/dropdownMock";
import { isBookingDateRangeAvailable } from "../isBookingDateRangeAvailable";

const date = [
  {
    date: ["2024-05-01", "2024-05-11"],
    selectPlace: placesMock[0],
    selectAdults: dropdownAdultsMock[0],
    selectChildren: dropdownChildrenMock[0],
  },
];

describe("isBookingDateRangeAvailable function", () => {
  it("should return true when the bookings array is not provided", () => {
    const value = isBookingDateRangeAvailable(
      new Date("2024-05-01"),
      new Date("2024-05-11"),
      []
    );

    expect(value).toBe(true);
  });

  it("should return false when the desired date is already reserved", () => {
    const value = isBookingDateRangeAvailable(
      new Date("2024-05-01"),
      new Date("2024-05-11"),
      date
    );

    expect(value).toBe(false);
  });

  it("should return true when the desired date is not reserved", () => {
    const value = isBookingDateRangeAvailable(
      new Date("2024-06-01"),
      new Date("2024-06-11"),
      date
    );

    expect(value).toBe(true);
  });
});
