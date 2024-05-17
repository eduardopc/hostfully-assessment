import { ReactElement } from "react";
import { Link } from "react-router-dom";

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
        <S.Icon clicked={menuIsOpen} />
      </S.MenuLabel>
      <S.NavBackground clicked={menuIsOpen} />

      <S.Navigation clicked={menuIsOpen}>
        <S.List>
          <Link to="/">
            <S.ItemLink onClick={openMenu}>Home</S.ItemLink>
          </Link>
          <Link to="/dashboard">
            <S.ItemLink onClick={openMenu}>Dashboard</S.ItemLink>
          </Link>
        </S.List>
      </S.Navigation>
    </S.WrapperMenu>
  );
};
