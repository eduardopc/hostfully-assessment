import { ReactElement } from "react";

import { BaseContainer } from "components/BaseContainer";
import { Container } from "components/Container";
import { BookingArea } from "components/BookingArea";
import { OPPORTUNITIES } from "languages";
import { OpportunitiesSection } from "components/OpportunitiesSection";
import { opportunitiesMock } from "__fixtures__/opportunitiesMock";

export const Home = (): ReactElement => {
  return (
    <BaseContainer>
      <Container>
        <BookingArea />

        <OpportunitiesSection
          title={OPPORTUNITIES.title}
          availableOpportunities={opportunitiesMock}
        />
      </Container>
    </BaseContainer>
  );
};
