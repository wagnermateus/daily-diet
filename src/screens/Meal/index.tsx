import { useEffect, useState } from "react";
import { MealHeader } from "../../components/MealHeader";
import {
  Container,
  Content,
  Description,
  MealInfo,
  StatusBox,
  Subtitle,
  Title,
} from "./styles";
import { Button } from "../../components/Button";
import { PencilSimpleLine, Trash } from "phosphor-react-native";
import { useTheme } from "styled-components/native";
import { StatusBall } from "../../components/StatusBall";
import { Alert, View } from "react-native";
import {
  StoredMealProps,
  mealGetByName,
} from "../../storage/Meal/mealGetByName";
import { useRoute } from "@react-navigation/native";
import { Loading } from "../../components/Loading";

type RouteParams = {
  name: string;
};

export function Meal() {
  const [meal, setMeal] = useState<StoredMealProps>();
  const [isLoading, setIsLoading] = useState(false);
  const { COLORS } = useTheme();
  const route = useRoute();
  const { name } = route.params as RouteParams;

  async function fecthMeal() {
    try {
      setIsLoading(true);
      const data = await mealGetByName(name);
      setMeal(data);
    } catch (error) {
      Alert.alert("Refeição", "Não foi possível apresentar os dados.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  console.log(meal);
  useEffect(() => {
    fecthMeal();
  }, []);

  if (isLoading || meal === undefined) {
    return <Loading />;
  }
  return (
    <Container isOnTheDiet={meal.data.isOnTheDiet}>
      <MealHeader title="Refeição" />
      <Content>
        <MealInfo>
          <Title>{meal.data.name}</Title>
          <Description>{meal.data.description}</Description>
          <Subtitle>Data e hora</Subtitle>
          <Description>{`${meal.date} às ${meal.data.hour}`} </Description>
          <StatusBox>
            <StatusBall isOnTheDiet={meal.data.isOnTheDiet} />
            <Description>
              {meal.data.isOnTheDiet ? "dentro da dieta" : "fora da dieta"}
            </Description>
          </StatusBox>
        </MealInfo>
        <View>
          <Button
            title="Editar refeição"
            icon={<PencilSimpleLine size={18} color={COLORS.WHITE} />}
          />

          <Button
            title="Excluir refeição"
            type="Secondary"
            icon={<Trash size={18} color={COLORS.gray_100} />}
          />
        </View>
      </Content>
    </Container>
  );
}
