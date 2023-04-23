import styled, { css } from "styled-components/native";
type Props = {
  height: number;
  width?: number;
};

export type InputStyleProps = Props;
export const Container = styled.View`
  gap: 4px;
`;

export const Input = styled.TextInput<Props>`
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  height: ${({ height }) => `${height}px`};
  padding: 14px;
  border: 1px solid ${({ theme }) => theme.COLORS.gray_500};
  border-radius: 6px;
`;

export const Label = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_200};
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
`;
