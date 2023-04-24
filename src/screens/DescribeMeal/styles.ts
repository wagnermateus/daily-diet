import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.gray_500};
`;
export const Content = styled.View`
  flex: 1;
  gap: 24px;

  padding: 40px 24px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${({ theme }) => theme.COLORS.gray_700};
`;
export const DateTime = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

export const RadioButtons = styled.View`
  flex-direction: row;
  gap: 8px;
`;
export const RadioButton = styled.Pressable`
  width: 152px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.COLORS.gray_600};
  border-width: 1px;
  border-color: transparent;
`;
export const RadioButtonLabel = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_100};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.SM}px;
  `}
  margin-bottom: 8px;
`;
