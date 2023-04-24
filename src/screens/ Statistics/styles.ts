import { ArrowLeft } from "phosphor-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

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
  background-color: ${({ theme }) => theme.COLORS.gray_700};
`;
