import { ReactElement } from "react";

import { BaseContainer } from "components/BaseContainer";
import { Container } from "components/Container";
import { BookingArea } from "components/BookingArea";
import { HOME } from "languages";
import { OpportunitiesSection } from "components/OpportunitiesSection";
import { opportunitiesMock } from "__fixtures__/opportunitiesMock";
import { useBooking } from "contexts";
import { BookingDashboard } from "components/BookingDashboard";

export const Home = (): ReactElement => {
  const { bookings } = useBooking();

  return (
    <BaseContainer>
      <Container>
        <BookingArea />

        {bookings.length && <BookingDashboard />}

        <OpportunitiesSection
          title={HOME.title}
          availableOpportunities={opportunitiesMock}
        />
      </Container>
    </BaseContainer>
  );
};
