import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";

type Props = {
  isOnTheDiet: boolean;
};
export const Container = styled(SafeAreaView)<Props>`
  flex: 1;

  background-color: ${({ theme, isOnTheDiet }) =>
    isOnTheDiet ? theme.COLORS.green_light : theme.COLORS.red_light};
`;

export const Content = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 40px 24px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${({ theme }) => theme.COLORS.gray_700};
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.LG}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.gray_100};
  `}
`;
export const Description = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.gray_200};
  `}
`;
export const Subtitle = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.gray_100};
  `}
`;
export const MealInfo = styled.View`
  gap: 24px;
`;
export const StatusBox = styled.View`
  width: 144px;
  height: 44px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: ${({ theme }) => theme.COLORS.gray_600};
  border-radius: 1000px;
  padding: 8px 16px;
`;
