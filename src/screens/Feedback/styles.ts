import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";

type Props = {
  isOnTheDiet: boolean;
};

export const Container = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.COLORS.gray_700};
`;

export const Title = styled.Text<Props>`
  ${({ theme, isOnTheDiet }) => css`
    font-size: ${theme.FONT_SIZE.XL}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${isOnTheDiet ? theme.COLORS.green_dark : theme.COLORS.red_dark};
  `}
`;

export const Subtitle = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.gray_100};
  `}

  margin-bottom: 40px;
  text-align: center;
`;

export const BoldText = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;
