import styled, { css } from "styled-components";

import media from "styled-media-query";

export const BookingDashboardWrapper = styled.div`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacings.large};
  `}
`;

export const Table = styled.table`
  ${({ theme }) => css`
    width: 100%;
    border-radius: ${theme.border.radius};
    background-color: ${theme.colors.lightGray};
    margin-top: ${theme.spacings.medium};

    thead {
      background-color: ${theme.colors.white};
      color: ${theme.colors.primary};
    }

    th,
    td {
      text-align: left;
      padding: ${theme.spacings.xsmall};
      white-space: nowrap;
    }

    tr:nth-child(even) {
      background-color: ${theme.colors.white};
    }

    ${media.lessThan("medium")`
      th {
        display: none;
      }

      td {
        display: flex;
        justify-content: space-between;
      }
    `}
  `}
`;

export const Cell = styled.span`
  display: none;

  ${media.lessThan("medium")`
    display: block;
    font-weight: ${({ theme }) => theme.font.bold};
  `}
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  ${media.lessThan("medium")`
    width: 100%;
    align-items: flex-end;
  `}
`;

export const Button = styled.button`
  cursor: pointer;
  border: none;
`;
