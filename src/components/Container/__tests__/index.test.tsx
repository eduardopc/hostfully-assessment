import { renderWithTheme } from "utils/tests/helpers";

import { Container } from "..";

describe("<Container />", () => {
  it("should render the content", () => {
    const { container } = renderWithTheme(
      <Container>
        <span>Hostfully</span>
      </Container>
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="sc-bgqQPU gniVwy"
      >
        <span>
          Hostfully
        </span>
      </div>
    `);
  });
});
