import { screen } from "@testing-library/react";

import { renderWithTheme } from "utils/tests/helpers";

import { BookingArea } from "..";
import { bannerMock } from "__fixtures__/bannersMock";

describe("<BookingArea />", () => {
  it("should render the Banner component", () => {
    renderWithTheme(<BookingArea />);

    expect(
      screen.getByRole("heading", { name: bannerMock.title })
    ).toBeDefined();
  });
});
