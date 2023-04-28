import { Image, SectionList, View, Text, Alert } from "react-native";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.png";

import {
  Container,
  Header,
  Icon,
  Meals,
  MealsList,
  StatisticsCard,
  Title,
} from "./styles";
import { Percentage } from "../../components/Percentage";
import { Button } from "../../components/Button";
import { Plus } from "phosphor-react-native";
import { useTheme } from "styled-components/native";
import { useCallback, useState } from "react";
import { MealCard } from "../../components/MealCard";
import { DateOfMeals } from "../../components/DateOfMeals";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { mealGetAll } from "../../storage/Meal/mealGetAll";
import { Loading } from "../../components/Loading";
import { MealStorageDTO } from "../../storage/Meal/MealStorageDTO";

export function Home() {
  const { COLORS } = useTheme();
  const navigation = useNavigation();
  const [meals, setMeals] = useState<MealStorageDTO>([]);
  const [totalMeals, setTotalMeals] = useState(0);
  const [totalMealsOnTheDiet, setTotalMealsOnTheDiet] = useState(0);
  const [isOnTheDiet, setIsOnTheDiet] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [percentage, setPercentage] = useState(0);

  async function fetchMeals() {
    try {
      setIsLoading(true);
      const data = await mealGetAll();
      setMeals(data);
    } catch (error) {
      Alert.alert("Não foi possível carregar as refeições");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function calculateThePercentage() {
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

      const totalMeals = meals.reduce(
        (accumulator, item) => {
          accumulator.total += item.data.length;
          return accumulator;
        },
        { total: 0 }
      );

      const divisionResult =
        totalNumberOfMealsInTheDiet.total / totalMeals.total;

      const percentageValue = divisionResult * 100;

      setPercentage(Math.trunc(percentageValue));

      const checkIfIsOnTheDiet = percentageValue > 70 ? true : false;

      setIsOnTheDiet(checkIfIsOnTheDiet);
      setTotalMeals(totalMeals.total);
      setTotalMealsOnTheDiet(totalNumberOfMealsInTheDiet.total);
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível apresentar a percentagem.");
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchMeals();
      calculateThePercentage();
    }, [])
  );

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Container>
      <Header>
        <Image source={logo} />
        <Image source={avatar} />
      </Header>
      <StatisticsCard
        isOnTheDiet={isOnTheDiet}
        onPress={() =>
          navigation.navigate("statistics", {
            totalMeals: totalMeals,
            percentage: percentage,
            totalMealsOnTheDiet: totalMealsOnTheDiet,
            isOnTheDiet: isOnTheDiet,
          })
        }
      >
        <Icon color={isOnTheDiet ? COLORS.green_dark : COLORS.red_dark} />
        <Percentage percentageValue={percentage} />
      </StatisticsCard>
      <Meals>
        <Title>Refeições</Title>
        <Button
          title="Nova refeição"
          type="Primary"
          icon={<Plus size={18} color={COLORS.WHITE} />}
          onPress={() => navigation.navigate("describe", { mealName: "" })}
        />
        <MealsList>
          <SectionList
            sections={meals}
            keyExtractor={(item, index) => item.name + index}
            renderItem={({ item }) => (
              <MealCard
                hour={item.hour}
                isOnTheDiet={item.isOnTheDiet}
                meal={item.name}
                onPress={() => navigation.navigate("meal", { name: item.name })}
              />
            )}
            renderSectionHeader={({ section: { date } }) => (
              <DateOfMeals date={date} />
            )}
            showsVerticalScrollIndicator={false}
            SectionSeparatorComponent={() => <View style={{ height: 8 }} />}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            ListEmptyComponent={() => (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>Registe a sua primeira refeição</Text>
              </View>
            )}
          />
        </MealsList>
      </Meals>
    </Container>
  );
}
