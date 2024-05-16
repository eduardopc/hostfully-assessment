import { ReactElement } from "react";

import { useBooking } from "contexts";

import * as S from "./styles";

export const HamburgerMenu = (): ReactElement => {
  const { menuIsOpen, openMenu } = useBooking();

  return (
    <S.WrapperMenu>
      <S.MenuLabel
        clicked={menuIsOpen}
        htmlFor="navi-toggle"
        onClick={openMenu}
      >
        <S.Icon clicked={menuIsOpen}>&nbsp;</S.Icon>
      </S.MenuLabel>
      <S.NavBackground clicked={menuIsOpen}>&nbsp;</S.NavBackground>

      <S.Navigation clicked={menuIsOpen}>
        <S.List>
          <S.ItemLink href="/" onClick={openMenu}>
            Home
          </S.ItemLink>
          <S.ItemLink href="/dashboard" onClick={openMenu}>
            Dashboard
          </S.ItemLink>
        </S.List>
      </S.Navigation>
    </S.WrapperMenu>
  );
};
