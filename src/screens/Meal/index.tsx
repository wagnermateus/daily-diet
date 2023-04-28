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
import { useNavigation, useRoute } from "@react-navigation/native";
import { Loading } from "../../components/Loading";
import { mealDeleteByName } from "../../storage/Meal/mealDeleteByName";

type RouteParams = {
  name: string;
};

export function Meal() {
  const [meal, setMeal] = useState<StoredMealProps>();
  const [isLoading, setIsLoading] = useState(false);
  const { COLORS } = useTheme();
  const navigation = useNavigation();
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

  async function mealRemove() {
    try {
      setIsLoading(true);
      await mealDeleteByName(meal!.data.name);
      navigation.navigate("home");
    } catch (error) {
      Alert.alert("Refeição", "Não foi possível deletar a refeição.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  function handleMealRemove() {
    Alert.alert("", "Deseja realmente excluir o registo da refeição?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sim, excluir", onPress: () => mealRemove() },
    ]);
  }

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
            onPress={() =>
              navigation.navigate("describe", { mealName: meal.data.name })
            }
          />

          <Button
            title="Excluir refeição"
            type="Secondary"
            icon={<Trash size={18} color={COLORS.gray_100} />}
            onPress={handleMealRemove}
          />
        </View>
      </Content>
    </Container>
  );
}
