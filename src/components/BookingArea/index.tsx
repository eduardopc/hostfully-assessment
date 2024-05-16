import { ReactElement } from "react";

import { Banner } from "components/Banner";
import { bannerMock } from "__fixtures__/bannersMock";

import * as S from "./styles";

export const BookingArea = (): ReactElement => {
  return (
    <S.Wrapper>
      <S.BookingWrapper>
        <Banner {...bannerMock} />
      </S.BookingWrapper>
    </S.Wrapper>
  );
};
