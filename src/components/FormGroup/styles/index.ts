import styled from "styled-components";

export const FormGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;

  small {
    color: ${({ theme }) => theme.colors.red};
    font-size: 12px;
    margin-top: ${({ theme }) => theme.spacings.xsmall};
    display: block;
  }
`;
