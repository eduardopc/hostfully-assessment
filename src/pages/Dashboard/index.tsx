import { ReactElement } from "react";

import { BaseContainer } from "components/BaseContainer";
import { Container } from "components/Container";
import { BookingDashboard } from "components/BookingDashboard";

export const Dashboard = (): ReactElement => {
  return (
    <BaseContainer>
      <Container>
        <BookingDashboard />
      </Container>
    </BaseContainer>
  );
};
