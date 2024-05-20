import { screen } from "@testing-library/react";

import { renderWithTheme } from "utils/tests/helpers";
import { BaseContainer } from "..";

describe("<BaseContainer />", () => {
  it("should render the children", () => {
    renderWithTheme(
      <BaseContainer>
        <div>test</div>
      </BaseContainer>
    );

    expect(screen.getByText("test")).toBeDefined();
  });

  it("should render the Footer component", () => {
    renderWithTheme(
      <BaseContainer>
        <div>test</div>
      </BaseContainer>
    );

    expect(screen.getByRole("heading", { name: /contact us/i })).toBeDefined();
    expect(screen.getByRole("heading", { name: /follow us/i })).toBeDefined();
    expect(screen.getByRole("heading", { name: /location/i })).toBeDefined();
  });
});
