import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";
import { ArrowUpRight } from "phosphor-react-native";

type Props = {
  isOnTheDiet: boolean;
};

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.gray_700};
  padding: 24px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const StatisticsCard = styled.TouchableOpacity<Props>`
  margin-top: 33px;
  width: 100%;
  padding: 20px 14px;
  border-radius: 8px;

  background-color: ${({ theme, isOnTheDiet }) =>
    isOnTheDiet ? theme.COLORS.green_light : theme.COLORS.red_light};
`;
export const Icon = styled(ArrowUpRight).attrs(({ theme }) => ({
  size: 24,
}))`
  align-self: flex-end;
`;

export const Meals = styled.View`
  flex: 1;
  margin-top: 40px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_100};
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
`;

export const MealsList = styled.View`
  flex: 1;
  margin-top: 32px;
`;
