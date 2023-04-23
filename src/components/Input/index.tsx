import {
  Container,
  Label,
  Input as InputComponent,
  InputStyleProps,
} from "./styles";

import { TextInputProps } from "react-native";

type Props = InputStyleProps &
  TextInputProps & {
    label: string;
  };

export function Input({ label, height, width, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Label>{label}</Label>
      <InputComponent height={height} width={width} {...rest} />
    </Container>
  );
}
