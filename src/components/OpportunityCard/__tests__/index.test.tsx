import { renderWithTheme } from "utils/tests/helpers";
import { screen } from "@testing-library/react";

import { OpportunityCard } from "..";

const props = {
  title: "Title",
  image: "image.jpg",
  description: "Description",
};

describe("<OpportunityCard />", () => {
  it("should render the OpportunityCard component", () => {
    renderWithTheme(<OpportunityCard {...props} />);

    expect(screen.getByText(props.title)).toBeDefined();
    expect(screen.getByRole("img")).toBeDefined();
    expect(screen.getByText(props.description)).toBeDefined();
  });
});
