import { renderWithTheme } from "utils/tests/helpers";
import { screen } from "@testing-library/react";

import { OpportunitiesSection } from "..";

const props = {
  title: "Title",
  availableOpportunities: [
    {
      title: "Title",
      image: "image.jpg",
      description: "Description",
    },
    {
      title: "Title2",
      image: "image2.jpg",
      description: "Description2",
    },
  ],
};

describe("<OpportunitiesSection />", () => {
  it("should render the OpportunitiesSection component", () => {
    renderWithTheme(<OpportunitiesSection {...props} />);

    expect(screen.getByRole("heading", { name: props.title })).toBeDefined();
  });

  it("should render all cards based on the availableOpportunities prop", () => {
    renderWithTheme(<OpportunitiesSection {...props} />);

    expect(screen.getAllByTestId("opportunity-card")).toHaveLength(
      props.availableOpportunities.length
    );
  });
});
