import { ReactElement } from "react";
import { Close } from "@styled-icons/material-outlined";

import Portal from "components/Portal";

import * as S from "./styles";

type ModalProps = {
  title: string;
  visible: boolean;
  children: ReactElement;
  onCancelButton?: () => void;
};

export const Modal = ({
  title,
  visible,
  children,
  onCancelButton,
}: ModalProps): ReactElement | null => {
  const handleCancelButton = () => {
    onCancelButton?.();
  };

  if (!visible) return null;

  return (
    <Portal>
      <S.Overlay>
        <S.Container>
          <S.HeaderContainer>
            <h1>{title}</h1>
            <button onClick={handleCancelButton} data-testid="close">
              <Close size={24} />
            </button>
          </S.HeaderContainer>
          <div className="modal-body">{children}</div>
        </S.Container>
      </S.Overlay>
    </Portal>
  );
};
