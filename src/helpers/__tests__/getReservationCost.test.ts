import { GENERAL } from "languages";
import { getReservationCost } from "../getReservationCost";

describe("getReservationCost function", () => {
  it("should return a message when dates or the pricePerDay is not provided", () => {
    const value = getReservationCost({
      pricePerDay: undefined,
      dates: undefined,
    });

    expect(value).toBe(GENERAL.remake_reservation);
  });

  it("should return the right value", () => {
    const price = 100;

    const value = getReservationCost({
      pricePerDay: price,
      dates: ["2021-09-01", "2021-09-11"],
    });

    expect(value).toBe("$1000");
  });
});
