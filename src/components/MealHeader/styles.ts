import { ArrowLeft } from "phosphor-react-native";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  height: 104px;
  gap: 82px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_100};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.LG}px;
  `}
`;

export const Icon = styled(ArrowLeft).attrs(({ theme }) => ({
  color: theme.COLORS.gray_200,
  size: 24,
}))`
  margin-left: 24px;
`;
