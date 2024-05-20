import { screen } from "@testing-library/react";
import { renderWithTheme } from "utils/tests/helpers";

import { Footer } from "..";

describe("<Footer />", () => {
  it("should render 3 columns topics", () => {
    const { container } = renderWithTheme(<Footer />);

    expect(screen.getByRole("heading", { name: /contact us/i })).toBeDefined();
    expect(screen.getByRole("heading", { name: /follow us/i })).toBeDefined();
    expect(screen.getByRole("heading", { name: /location/i })).toBeDefined();

    expect(container.firstChild).toMatchSnapshot();
  });
});
