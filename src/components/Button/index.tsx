import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ForwardedRef,
  ReactElement,
  forwardRef,
} from "react";
import * as S from "./styles";

type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = {
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  minimal?: boolean;
  icon?: JSX.Element;
  as?: React.ElementType;
} & ButtonTypes;

export const Button = forwardRef(
  (
    {
      children,
      icon,
      size = "medium",
      fullWidth = false,
      minimal = false,
      ...props
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ): ReactElement => {
    return (
      <S.Wrapper
        size={size}
        fullWidth={fullWidth}
        hasIcon={!!icon}
        minimal={minimal}
        ref={ref}
        {...props}
      >
        {icon}
        {!!children && <span>{children}</span>}
      </S.Wrapper>
    );
  }
);
