import styled, { css } from "styled-components/native";

type Props = {
  isOnTheDiet: boolean;
};

export type MealCardStyleProp = Props;

export const Container = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 14px 16px;
  border-radius: 6px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.COLORS.gray_500};
`;

export const Hour = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.XS}px;
    color: ${theme.COLORS.gray_100};
  `}
  margin-right: 12px;
`;

export const Meal = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.gray_200};
  `}

  flex: 1;
  padding-left: 12px;
  border-left-color: ${({ theme }) => theme.COLORS.gray_400};
  border-left-width: 1px;
`;

export const StatusBall = styled.View<Props>`
  width: 14px;
  height: 14px;
  background-color: ${({ theme, isOnTheDiet }) =>
    isOnTheDiet ? theme.COLORS.green_mid : theme.COLORS.red_mid};
  border-radius: 999px;
`;
