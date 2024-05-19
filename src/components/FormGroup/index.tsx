import { ReactElement } from "react";

import * as S from "./styles";

type FormGroupProps = {
  error?: string;
  children: ReactElement;
  showFullWidth?: boolean;
};

export const FormGroup = ({
  error,
  children,
  showFullWidth = false,
}: FormGroupProps): ReactElement => {
  return (
    <S.FormGroupWrapper $showFullWidth={showFullWidth}>
      <div className="form-item">{children}</div>
      {error && <small>{error}</small>}
    </S.FormGroupWrapper>
  );
};
