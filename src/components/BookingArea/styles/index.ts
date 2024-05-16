import styled, { css } from "styled-components";
import media from "styled-media-query";

import { Wrapper as BannerWrapper } from "components/Banner/styles";

export const Wrapper = styled.section`
  ${media.greaterThan("large")`
      ${BannerWrapper} {
        max-width: 127rem;
        margin: 0 auto;
      }
  `}
`;

export const BookingWrapper = styled.section`
  ${({ theme }) => css`
    margin: 0 calc(-${theme.grid.gutter} / 2) ${theme.spacings.large};

    ${media.greaterThan("medium")`
      margin-bottom: ${theme.spacings.large};
      position: relative;
      z-index: ${theme.layers.base};
    `}
  `}
`;
