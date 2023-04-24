import styled from "styled-components/native";

type Props = {
  isOnTheDiet: boolean | undefined;
};

export type StatusBallStyleProps = Props;

export const Container = styled.View<Props>`
  width: 8px;
  height: 8px;
  border-radius: 999px;

  background-color: ${({ theme, isOnTheDiet }) =>
    isOnTheDiet ? theme.COLORS.green_dark : theme.COLORS.red_dark};
`;
