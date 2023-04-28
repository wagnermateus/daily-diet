import { useEffect, useState } from "react";
import { Container, Subtitle, Title } from "./styles";
import { mealGetAll } from "../../storage/Meal/mealGetAll";

type Props = {
  percentageValue: number;
};

export function Percentage() {
  const [percentage, setPercentage] = useState(0);

  async function calculateThePercentage() {
    const meals = await mealGetAll();

    const totalNumberOfMealsInTheDiet = meals.reduce(
      (accumulator, item) => {
        item.data.map((item) => {
          if (item.isOnTheDiet === true) {
            accumulator.total += 1;
          }
        });

        return accumulator;
      },
      { total: 0 }
    );

    const totalMeals = meals.reduce(
      (accumulator, item) => {
        accumulator.total += item.data.length;
        return accumulator;
      },
      { total: 0 }
    );

    const divisionResult = totalNumberOfMealsInTheDiet.total / totalMeals.total;

    const percentageValue = divisionResult * 100;

    setPercentage(Math.trunc(percentageValue));
  }

  useEffect(() => {
    calculateThePercentage();
  }, []);
  return (
    <Container>
      <Title>{percentage}%</Title>
      <Subtitle>das refeições dentro da dieta</Subtitle>
    </Container>
  );
}
