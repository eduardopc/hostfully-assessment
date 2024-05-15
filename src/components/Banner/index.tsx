import { BookingForm } from "components/BookingForm";

import * as S from "./styles";

type BannerProps = {
  img: string;
  title: string;
  subtitle: string;
};

export const Banner = ({ img, title, subtitle }: BannerProps) => (
  <S.Wrapper>
    <S.Image role="img" src={img} aria-label={title} />

    <S.Caption>
      <S.Title>{title}</S.Title>
      <S.Subtitle dangerouslySetInnerHTML={{ __html: subtitle }} />

      <BookingForm formDirection="row" />
    </S.Caption>
  </S.Wrapper>
);
