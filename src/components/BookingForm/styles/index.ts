import styled, { css } from "styled-components";

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

type BookingFormButtonsSectionProps = {
  $openedFromModal: boolean;
};

export const BookingFormButtonsSection = styled.div<BookingFormButtonsSectionProps>`
  ${({ theme, $openedFromModal }) => css`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: ${$openedFromModal ? theme.spacings.xxsmall : theme.spacings.xsmall};
    flex-wrap: wrap;
    margin-top: ${$openedFromModal ? theme.spacings.medium : "auto"};
  `}
`;
