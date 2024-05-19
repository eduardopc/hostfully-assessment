import { ReactElement } from "react";

import { BaseContainer } from "components/BaseContainer";
import { Container } from "components/Container";
import { BookingArea } from "components/BookingArea";
import { OpportunitiesSection } from "components/OpportunitiesSection";
import { BookingDashboard } from "components/BookingDashboard";

import { opportunitiesMock } from "__fixtures__/opportunitiesMock";
import { HOME } from "languages";
import { useBooking } from "contexts";

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
