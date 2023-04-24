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

export const Content = styled.View`
  flex: 1;
  padding: 40px 24px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${({ theme }) => theme.COLORS.gray_700};
`;
