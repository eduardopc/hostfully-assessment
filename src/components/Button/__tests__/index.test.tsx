import { screen } from "@testing-library/react";
import { renderWithTheme } from "utils/tests/helpers";
import { AddShoppingCart } from "@styled-icons/material-outlined/AddShoppingCart";

import { Button } from "..";

describe("<Button />", () => {
  it("should render the medium size by default ", () => {
    const { container } = renderWithTheme(<Button>Hostfully</Button>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render an icon version", () => {
    renderWithTheme(
      <Button icon={<AddShoppingCart data-testid="icon" />}>Hostfully</Button>
    );

    expect(screen.getByText(/Hostfully/i)).toBeDefined();
    expect(screen.getByTestId("icon")).toBeDefined();
  });

  it("should render Button as a link", () => {
    renderWithTheme(
      <Button as="a" href="/link">
        Hostfully
      </Button>
    );

    expect(screen.getByRole("link", { name: /Hostfully/i })).toHaveProperty(
      "href",
      "http://localhost:3000/link"
    );
  });
});
