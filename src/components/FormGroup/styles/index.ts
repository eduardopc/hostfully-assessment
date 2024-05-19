import styled, { css } from "styled-components";

type FormGroupWrapperProps = {
  $showFullWidth: boolean;
};

export const FormGroupWrapper = styled.div<FormGroupWrapperProps>`
  ${({ $showFullWidth }) => css`
    display: flex;
    flex-direction: column;
    width: ${$showFullWidth ? "-webkit-fill-available" : "auto"};

    small {
      color: ${({ theme }) => theme.colors.red};
      font-size: 12px;
      margin-top: ${({ theme }) => theme.spacings.xsmall};
      display: block;
    }
  `}
`;
