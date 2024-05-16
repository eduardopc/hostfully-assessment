import styled, { css } from "styled-components";
import media from "styled-media-query";

type TClicked = {
  clicked: boolean;
};

export const WrapperMenu = styled.div`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacings.medium};

    ${media.greaterThan("medium")`
      margin-bottom: ${theme.spacings.xxlarge};
    `}
  `}
`;

export const MenuLabel = styled.label<TClicked>`
  ${({ clicked }) => css`
    background-color: ${clicked ? "transparent" : "rgba(54, 241, 205, 0.8)"};
    position: absolute;
    top: 2rem;
    left: 2rem;
    border-radius: 50%;
    height: 3.5rem;
    width: 3.5rem;
    cursor: pointer;
    z-index: 1000;
    box-shadow: ${clicked ? "" : "0 1rem 3rem rgba(68, 68, 68, 0.3)"};
    text-align: center;

    ${media.greaterThan("medium")`
      height: 6rem;
      width: 6rem;
    `}
  `}
`;

export const NavBackground = styled.div<TClicked>`
  ${({ theme, clicked }) => css`
    position: fixed;
    top: 1rem;
    left: 1rem;
    background-image: radial-gradient(
      ${theme.colors.secondary},
      ${theme.colors.mainBg}
    );
    height: 6rem;
    width: 6rem;
    border-radius: 50%;
    z-index: 600;
    transform: ${clicked ? "scale(80)" : "scale(0)"};
    transition: transform 0.8s;

    ${media.greaterThan("medium")`
      top: 3.5rem;
      left: 3.5rem;
    `}
  `}
`;

export const Icon = styled.span<TClicked>`
  ${({ clicked }) => css`
    position: relative;
    background-color: ${clicked ? "transparent" : "black"};
    width: 1.5rem;
    height: 1px;
    display: inline-block;
    margin-top: 1.7rem;
    transition: all 0.3s;

    &::before,
    &::after {
      content: "";
      background-color: black;
      width: 1.5rem;
      height: 1px;
      display: inline-block;
      position: absolute;
      left: 0;
      transition: all 0.3s;

      ${media.greaterThan("medium")`
        width: 3rem;
        height: 2px;
      `}
    }
    &::before {
      top: ${clicked ? "0" : "-0.8rem"};
      transform: ${clicked ? "rotate(135deg)" : "rotate(0)"};
    }
    &::after {
      top: ${clicked ? "0" : "0.8rem"};
      transform: ${clicked ? "rotate(-135deg)" : "rotate(0)"};
    }
    ${MenuLabel}:hover &::before {
      top: ${clicked ? "0" : "-1rem"};
    }
    ${MenuLabel}:hover &::after {
      top: ${clicked ? "0" : "1rem"};
    }

    ${media.greaterThan("medium")`
      width: 3rem;
      height: 2px;
      margin-top: 3rem;
    `}
  `}
`;

export const Navigation = styled.nav<TClicked>`
  ${({ clicked }) => css`
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 600;
    width: ${clicked ? "100%" : "0"};
    opacity: ${clicked ? "1" : "0"};
    transition: width 0.8s, opacity 0.8s;
  `}
`;

export const List = styled.div`
  position: absolute;
  list-style: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
`;
export const ItemLink = styled.a`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    font-size: 3rem;
    font-weight: 300;
    text-decoration: none;
    color: ${theme.colors.mainBg};
    padding: 1rem 2rem;
    background-size: 240%;
    transition: all 0.4s;

    &:hover,
    &:active {
      background-position: 100%;
      color: ${theme.colors.mainBg};
      transform: translateX(1rem);
    }
  `}
`;
