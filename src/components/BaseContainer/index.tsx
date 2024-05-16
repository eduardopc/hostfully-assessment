import React, { ReactElement } from "react";

import * as S from "./styles";
import { Container } from "components/Container";
import { Footer } from "components/Footer";
import { useBooking } from "contexts";

export type BaseContainerProps = {
  children: React.ReactNode;
};

export const BaseContainer = ({
  children,
}: BaseContainerProps): ReactElement => {
  const { menuIsOpen } = useBooking();

  return (
    <S.Wrapper isOpen={menuIsOpen}>
      <S.Content>{children}</S.Content>

      <S.SectionFooter>
        <Container>
          <Footer />
        </Container>
      </S.SectionFooter>
    </S.Wrapper>
  );
};
