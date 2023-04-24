import { useState } from "react";
import { MealHeader } from "../../components/MealHeader";
import { Container, Content } from "./styles";

export function Meal() {
  const [isOnTheDiet, setIsOnTheDiet] = useState(true);
  return (
    <Container isOnTheDiet={isOnTheDiet}>
      <MealHeader title="Refeição" />
      <Content></Content>
    </Container>
  );
}
