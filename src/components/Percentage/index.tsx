import { useState } from "react";
import { Container, Icon, Value, ValueText } from "./styles";
import { useTheme } from "styled-components";

export function Percentage() {
  const [isOnTheDiet, setIsOnTheDiet] = useState(true);

  const { COLORS } = useTheme();
  return (
    <Container isOnTheDiet={isOnTheDiet}>
      <Icon color={isOnTheDiet ? COLORS.green_dark : COLORS.red_dark} />
      <Value>90,86%</Value>
      <ValueText>das refeições dentro da dieta</ValueText>
    </Container>
  );
}
