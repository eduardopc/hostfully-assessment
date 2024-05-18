import styled from "styled-components";

import media from "styled-media-query";

export type BookingFormStyleProps = {
  $formDirection: "column" | "row";
};

export const BookingFormWrapper = styled.div<BookingFormStyleProps>`
  display: flex;
  justify-content: space-between;
  flex-direction: ${({ $formDirection }) => $formDirection};
  flex-wrap: wrap;

  ${media.lessThan("large")`
    align-items: center;
    justify-content: flex-start;
    gap: ${({ theme }) => theme.spacings.medium};
  `}
`;

export const BookingFormSection = styled.section<BookingFormStyleProps>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: ${({ $formDirection }) => $formDirection};
  gap: ${({ theme }) => theme.spacings.xsmall};
`;

export const BookingFormButtonsSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacings.xsmall};
  flex-wrap: wrap;

  ${media.greaterThan("medium")`
    margin-left: ${({ theme }) => theme.spacings.xsmall};
  `}
`;
