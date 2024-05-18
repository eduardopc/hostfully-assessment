import { ReactElement } from "react";

import Portal from "components/Portal";
import { Button } from "components/Button";

import * as S from "./styles";
import { GENERAL } from "languages";

type ModalProps = {
  title: string;
  visible: boolean;
  children: ReactElement;
  onCancelButton?: () => void;
  onConfirmButton?: () => void;
};

export const Modal = ({
  title,
  visible,
  children,
  onCancelButton,
  onConfirmButton,
}: ModalProps): ReactElement | null => {
  const handleCancelButton = () => {
    onCancelButton?.();
  };

  const handleConfirmButton = () => {
    onConfirmButton?.();
  };

  if (!visible) return null;

  return (
    <Portal>
      <S.Overlay>
        <S.Container>
          <h1>{title}</h1>
          <div className="modal-body">{children}</div>
          <S.Footer>
            <Button minimal onClick={handleCancelButton}>
              {GENERAL.cancel_button}
            </Button>
            <Button>{GENERAL.update_button}</Button>
          </S.Footer>
        </S.Container>
      </S.Overlay>
    </Portal>
  );
};
