import { screen } from "@testing-library/react";

import { renderWithTheme } from "utils/tests/helpers";
import { FormGroup } from "..";

const props = {
  children: <div>Test</div>,
  error: "",
  showFullWidth: false,
};

describe("<FormGroup />", () => {
  it("should render children", () => {
    renderWithTheme(<FormGroup {...props} />);

    expect(screen.getByText(/test/i)).toBeDefined();
  });

  it("should render error message", () => {
    renderWithTheme(<FormGroup {...props} error="sample error" />);

    expect(screen.getByText(/sample error/i)).toBeDefined();
  });
});
