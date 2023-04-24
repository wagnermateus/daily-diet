import { ArrowLeft } from "phosphor-react-native";
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
export const Header = styled.View`
  justify-content: center;
  padding-left: 24px;
  height: 168px;
`;

export const Icon = styled(ArrowLeft).attrs({
  size: 24,
})`
  margin-left: 8px;
`;

export const Content = styled.View`
  flex: 1;
  gap: 24px;
  align-items: center;
  padding: 33px 24px 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${({ theme }) => theme.COLORS.gray_700};
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.gray_100};
  `}
`;
export const DataContainer = styled.View`
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

export const DataContent = styled.View`
  width: 327px;
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.COLORS.gray_600};
`;
