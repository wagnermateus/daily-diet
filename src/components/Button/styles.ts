import styled, { css } from "styled-components/native";

export type ButtonStyleProps = "Primary" | "Secondary";

type Props = {
  type?: ButtonStyleProps;
};

export const Container = styled.TouchableOpacity<Props>`
  margin-top: 8px;
  border-radius: 6px;
  padding: 16px 24px;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme, type }) =>
    type === "Primary" ? theme.COLORS.gray_200 : theme.COLORS.WHITE};

  border: 1px solid
    ${({ theme, type }) =>
      type === "Primary" ? theme.COLORS.WHITE : theme.COLORS.gray_100};
`;

export const Title = styled.Text<Props>`
  ${({ theme, type }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${({ theme }) =>
      type === "Primary" ? theme.COLORS.WHITE : theme.COLORS.gray_100};
  `}

  margin-left: 12px;
`;
