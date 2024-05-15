import styled from "styled-components";

export type BookingFormStyleProps = {
  $formDirection: "column" | "row";
};

export const BookingFormWrapper = styled.div<BookingFormStyleProps>`
  display: flex;
  justify-content: space-between;
  flex-direction: ${({ $formDirection }) => $formDirection};
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
  margin-left: ${({ theme }) => theme.spacings.xsmall};
`;
