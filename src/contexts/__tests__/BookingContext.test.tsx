import { act } from "@testing-library/react";
import {
  RenderHookResult,
  Renderer,
  renderHook,
} from "@testing-library/react-hooks";
import {
  dropdownAdultsMock,
  dropdownChildrenMock,
  placesMock,
} from "__fixtures__/dropdownMock";
import { BookingProvider, useBooking } from "contexts";
import { BookingContextData, BookingContextProps } from "contexts/types";

const UUID = "123";
vi.mock("uuid", () => ({ v4: () => UUID }));

const setup = (): RenderHookResult<
  BookingContextProps,
  BookingContextData,
  Renderer<BookingContextProps>
> => {
  return renderHook(() => useBooking(), {
    wrapper: (props: BookingContextProps) => <BookingProvider {...props} />,
  });
};

describe("<BookingContext />", () => {
  it("should be able to return the default values", () => {
    const { result } = setup();

    expect(result.current.bookings).toStrictEqual([]);

    expect(result.current.showUpdateModal).toStrictEqual(false);
  });

  it("should set to true the showUpdateModal when call the handleShowModal", () => {
    const { result } = setup();

    act(() => {
      result.current.handleShowModal();
    });

    expect(result.current.showUpdateModal).toStrictEqual(true);
  });

  it("should save a booking when call the handleBooking", () => {
    const { result } = setup();

    const props = {
      date: [new Date()],
      selectPlace: placesMock[0],
      selectAdults: dropdownAdultsMock[0],
      selectChildren: dropdownChildrenMock[0],
    };

    act(() => {
      result.current.handleBooking({ ...props });
    });

    expect(result.current.bookings).toStrictEqual([
      {
        id: UUID,
        ...props,
      },
    ]);
  });

  it("should delete a booking when call the handleDeleteReservation", () => {
    const { result } = setup();

    const props = {
      date: [new Date()],
      selectPlace: placesMock[0],
      selectAdults: dropdownAdultsMock[0],
      selectChildren: dropdownChildrenMock[0],
    };

    act(() => {
      result.current.handleBooking({ ...props });
    });

    expect(result.current.bookings).toStrictEqual([
      {
        id: UUID,
        ...props,
      },
    ]);

    act(() => {
      result.current.handleDeleteReservation(UUID);
    });

    expect(result.current.bookings).toStrictEqual([]);
  });

  it("should update a booking when call the handleBooking with an ID", () => {
    const { result } = setup();

    const props = {
      date: [new Date()],
      selectPlace: placesMock[0],
      selectAdults: dropdownAdultsMock[0],
      selectChildren: dropdownChildrenMock[0],
    };

    act(() => {
      result.current.handleBooking({ ...props });
    });

    expect(result.current.bookings).toStrictEqual([
      {
        id: UUID,
        ...props,
      },
    ]);

    act(() => {
      result.current.handleBooking({
        ...props,
        id: UUID,
        selectPlace: placesMock[1],
      });
    });

    expect(result.current.bookings).toStrictEqual([
      {
        ...props,
        id: UUID,
        selectPlace: placesMock[1],
      },
    ]);
  });
});
