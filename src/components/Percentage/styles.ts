import styled, { css } from "styled-components/native";
import { ArrowUpRight } from "phosphor-react-native";

export type Props = {
  isOnTheDiet: boolean;
};

export const Container = styled.TouchableOpacity<Props>`
  margin-top: 33px;
  width: 100%;
  padding: 20px 14px;
  border-radius: 8px;
  align-items: center;
  background-color: ${({ theme, isOnTheDiet }) =>
    isOnTheDiet ? theme.COLORS.green_light : theme.COLORS.red_light};
`;

export const Value = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE["2XL"]}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.gray_100};
  `}
`;

export const ValueText = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.gray_200}; ;
  `}
`;

export const Icon = styled(ArrowUpRight).attrs(({ theme }) => ({
  size: 24,
}))`
  align-self: flex-end;
`;
