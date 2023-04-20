import styled, { css } from "styled-components/native";

type Props = {
  type: "Primary" | "Secondary";
};

export const Container = styled.TouchableOpacity<Props>`
  border-radius: 6px;
  padding: 16px 24px;

  background-color: ${({ theme, type }) =>
    type === "Primary" ? theme.COLORS.gray_200 : theme.COLORS.WHITE};
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.WHITE};
  `}
`;
