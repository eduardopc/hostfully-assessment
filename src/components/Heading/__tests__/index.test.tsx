import { screen } from "@testing-library/react";
import { renderWithTheme } from "utils/tests/helpers";

import { Heading } from "..";

describe("<Heading />", () => {
  it("should render the heading component", () => {
    renderWithTheme(<Heading>Hostfully</Heading>);

    expect(screen.getByRole("heading", { name: /Hostfully/i })).toBeDefined();
  });
});
