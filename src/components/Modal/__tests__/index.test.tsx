import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithTheme } from "utils/tests/helpers";
import { Modal } from "..";

const props = {
  title: "Title",
  visible: true,
  children: <span>Children</span>,
  onCancelButton: vi.fn(),
};

describe("<Modal />", () => {
  it("should not render the Modal when visible is false", () => {
    const defaultProps = {
      ...props,
      visible: false,
    };

    renderWithTheme(<Modal {...defaultProps} />);

    expect(screen.queryByRole("heading", { name: props.title })).toBeNull();
  });

  it("should render the modal", () => {
    renderWithTheme(<Modal {...props} />);

    expect(screen.getByRole("heading", { name: props.title })).toBeDefined();

    expect(screen.getByText("Children")).toBeDefined();
  });

  it("should call onCancelButton when the close button is clicked", async () => {
    renderWithTheme(<Modal {...props} />);

    userEvent.click(screen.getByTestId("close"));

    await waitFor(() => {
      expect(props.onCancelButton).toHaveBeenCalledTimes(1);
    });
  });
});
