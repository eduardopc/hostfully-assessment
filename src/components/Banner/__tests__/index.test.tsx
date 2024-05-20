import { screen } from "@testing-library/react";
import { renderWithTheme } from "utils/tests/helpers";

import { Banner } from "..";
import { GENERAL } from "languages";

const props = {
  img: "img.jpg",
  title: "Hostfully",
  subtitle: "Testing Subtitle",
};

describe("<Banner />", () => {
  it("should render the Banner component", () => {
    renderWithTheme(<Banner {...props} />);

    expect(screen.getByRole("heading", { name: props.title })).toBeDefined();

    expect(screen.getByRole("heading", { name: props.subtitle })).toBeDefined();
  });

  it("should render the form in its initial state to make a booking", () => {
    renderWithTheme(<Banner {...props} />);

    expect(screen.getByText(GENERAL.date_picker.dates)).toBeDefined();

    expect(screen.getByText(GENERAL.dropdown.adults)).toBeDefined();

    expect(screen.getByText(GENERAL.dropdown.children)).toBeDefined();
  });
});
