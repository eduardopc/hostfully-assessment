import styled, { css } from "styled-components";

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

export const Container = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    border-radius: ${theme.border.radius};
    padding: ${theme.spacings.small};
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    max-width: 450px;
    width: 100%;

    > h1 {
      font-size: 22px;
    }

    .modal-body {
      margin-top: 16px;
      display: flex;
      justify-content: center;
    }
  `}
`;

export const Footer = styled.footer`
  ${({ theme }) => css`
    margin-top: ${theme.spacings.medium};
    display: flex;
    align-items: center;
    justify-content: flex-end;
  `}
`;
