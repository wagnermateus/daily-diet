import { Container, Hour, Meal, MealCardStyleProp, StatusBall } from "./styles";
import { TouchableOpacityProps } from "react-native";

type Props = MealCardStyleProp &
  TouchableOpacityProps & {
    hour: string;
    meal: string;
  };

export function MealCard({ hour, meal, isOnTheDiet, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Hour>{hour}</Hour>
      <Meal>{meal}</Meal>
      <StatusBall isOnTheDiet={isOnTheDiet} />
    </Container>
  );
}
