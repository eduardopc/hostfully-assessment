import { ReactElement } from "react";

import * as S from "./styles";

type FormGroupProps = {
  error?: string;
  children: ReactElement;
};

export const FormGroup = ({
  error,
  children,
}: FormGroupProps): ReactElement => {
  return (
    <S.FormGroupWrapper>
      <div className="form-item">{children}</div>
      {error && <small>{error}</small>}
    </S.FormGroupWrapper>
  );
};
