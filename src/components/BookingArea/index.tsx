import { ReactElement } from "react";

import { Banner } from "components/Banner";
import { bannerMock } from "__fixtures__/bannersMock";

import * as S from "./styles";

export const BookingArea = (): ReactElement => {
  return (
    <S.Wrapper>
      <S.BookingWrapper>
        <S.BookingSection>
          <Banner {...bannerMock} />
        </S.BookingSection>
      </S.BookingWrapper>
    </S.Wrapper>
  );
};
