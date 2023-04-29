import { Alert, TouchableOpacity, View } from "react-native";
import { Percentage } from "../../components/Percentage";
import {
  Container,
  Content,
  DataContainer,
  DataContent,
  Header,
  Icon,
  Title,
} from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { useEffect, useState } from "react";
import { StatisticsData } from "../../components/StatisticsData";
import { mealGetAll } from "../../storage/Meal/mealGetAll";
import { Loading } from "../../components/Loading";

type RouteParams = {
  percentage: number;

  isOnTheDiet: boolean;
};
export function Statistics() {
  const navigation = useNavigation();
  const { COLORS } = useTheme();
  const route = useRoute();

  const [isLoading, setIsLoading] = useState(false);
  const { percentage, isOnTheDiet } = route.params as RouteParams;
  const [totalNumberOfMealsInTheDiet, setTotalNumberOfMealsInTheDiet] =
    useState(0);
  const [totalMeals, setTotalMeals] = useState(0);
  const [totalOffDietMeals, setTotalOffDietMeals] = useState(0);
  const [betterSequence, setBetterSequence] = useState(0);

  async function calculateStatistics() {
    try {
      setIsLoading(true);
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
      setTotalNumberOfMealsInTheDiet(totalNumberOfMealsInTheDiet.total);

      const totalMeals = meals.reduce(
        (accumulator, item) => {
          accumulator.total += item.data.length;
          return accumulator;
        },
        { total: 0 }
      );
      setTotalMeals(totalMeals.total);

      const totalOffDietMeals =
        totalMeals.total - totalNumberOfMealsInTheDiet.total;
      setTotalOffDietMeals(totalOffDietMeals);

      let accumulator = 0;
      let betterSequence = 0;

      const calculateBetterSequence = () => {
        for (let i = 0; i < meals.length; i++) {
          for (let x = 0; x < meals[i].data.length; x++) {
            if (meals[i].data[x].isOnTheDiet === true) {
              accumulator += 1;
            } else {
              if (accumulator > betterSequence) {
                betterSequence = accumulator;
                accumulator = 0;
              }
            }
          }
        }
        if (accumulator > betterSequence) {
          betterSequence = accumulator;
          accumulator = 0;
        }
        setBetterSequence(betterSequence);
      };
      calculateBetterSequence();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível apresentar as estatísticas.");
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    calculateStatistics();
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Container isOnTheDiet={isOnTheDiet}>
      <Header>
        <TouchableOpacity onPress={() => navigation.navigate("home")}>
          <Icon color={isOnTheDiet ? COLORS.green_dark : COLORS.red_dark} />
        </TouchableOpacity>
        <Percentage percentageValue={percentage} />
      </Header>
      <Content>
        <Title>Estatísticas gerais</Title>
        <DataContainer>
          <DataContent>
            <StatisticsData
              value={betterSequence}
              description="melhor sequência de pratos dentro da dieta"
            />
          </DataContent>
          <DataContent>
            <StatisticsData
              value={totalMeals}
              description="refeições registradas"
            />
          </DataContent>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <DataContent
              style={{ width: 157.5, backgroundColor: COLORS.green_light }}
            >
              <StatisticsData
                value={totalNumberOfMealsInTheDiet}
                description="refeições dentro da dieta"
              />
            </DataContent>
            <DataContent
              style={{ width: 157.5, backgroundColor: COLORS.red_light }}
            >
              <StatisticsData
                value={totalOffDietMeals}
                description="refeições fora da dieta"
              />
            </DataContent>
          </View>
        </DataContainer>
      </Content>
    </Container>
  );
}
