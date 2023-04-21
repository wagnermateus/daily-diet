import { Container, Hour, Meal, MealCardStyleProp, StatusBall } from "./styles";

type Props = MealCardStyleProp & {
  hour: string;
  meal: string;
};

export function MealCard({ hour, meal, isOnTheDiet }: Props) {
  return (
    <Container>
      <Hour>{hour}</Hour>
      <Meal>{meal}</Meal>
      <StatusBall isOnTheDiet={isOnTheDiet} />
    </Container>
  );
}
