import { ReactElement } from "react";

import * as S from "./styles";

export type LineColors = "primary" | "secondary";

export type HeadingProps = {
  children: React.ReactNode;
  color?: "white" | "black";
  lineLeft?: boolean;
  lineBottom?: boolean;
  size?: "small" | "medium" | "huge";
  lineColor?: "primary" | "secondary";
};

export const Heading = ({
  children,
  color = "white",
  lineColor = "primary",
  lineLeft = false,
  lineBottom = false,
  size = "medium",
}: HeadingProps): ReactElement => (
  <S.Wrapper
    color={color}
    $lineLeft={lineLeft}
    $lineBottom={lineBottom}
    size={size}
    $lineColor={lineColor}
  >
    {children}
  </S.Wrapper>
);
