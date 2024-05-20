import { screen } from "@testing-library/react";

import { renderWithTheme } from "utils/tests/helpers";

import { SelectWrapper } from "..";

const props = {
  placeholder: "Select a place",
  defaultValue: null,
  selectOptions: [
    { value: "1", label: "Place 1" },
    { value: "2", label: "Place 2" },
  ],
  showFullWidth: true,
  onChange: vi.fn(),
};

describe("<SelectWrapper />", () => {
  it("should render the SelectWrapper component", () => {
    renderWithTheme(<SelectWrapper {...props} />);

    expect(screen.getByText(props.placeholder)).toBeDefined();
  });

  it("should match with the snapshot", () => {
    const { container } = renderWithTheme(<SelectWrapper {...props} />);

    expect(container).toMatchSnapshot();
  });
});
