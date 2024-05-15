import styled, { css } from "styled-components";

export const Card = styled.article`
  ${({ theme }) => css`
    border-radius: ${theme.border.radius};
    background-color: ${theme.colors.white};
    padding: ${theme.spacings.small};
    text-align: center;
    cursor: pointer;
  `}
`;

export const Image = styled.img`
  ${({ theme }) => css`
    object-fit: cover;
    width: 18rem;
    height: 12.5rem;
    border-radius: ${theme.border.radius};
    margin: auto;
    margin-bottom: ${theme.spacings.xsmall};
  `}
`;

export const Title = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.bold};
    color: ${theme.colors.black};
  `}
`;

export const Description = styled.div`
  ${({ theme }) => css`
    margin-top: ${theme.spacings.xsmall};
    font-size: ${theme.font.sizes.xsmall};
    color: ${theme.colors.gray};
  `}
`;
