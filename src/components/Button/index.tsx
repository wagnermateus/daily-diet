import { TouchableOpacityProps } from "react-native";
import { ButtonStyleProps, Container, Title } from "./styles";
import { ReactNode } from "react";

type Props = TouchableOpacityProps & {
  title: string;
  type?: ButtonStyleProps;
  icon?: ReactNode;
};
export function Button({ icon, title, type = "Primary", ...rest }: Props) {
  return (
    <Container type={type} {...rest}>
      {icon}
      <Title type={type}>{title}</Title>
    </Container>
  );
}
