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

type MealsProps = {
  date: string;
  data: {
    name: string;
    hour: string;
    isOnTheDiet: boolean;
    description: string;
  }[];
}[];
export function Home() {
  const { COLORS } = useTheme();
  const navigation = useNavigation();
  const [meals, setMeals] = useState<MealsProps>([]);
  const [isOnTheDiet, setIsOnTheDiet] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
  useFocusEffect(
    useCallback(() => {
      fetchMeals();
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
        onPress={() => navigation.navigate("statistics")}
      >
        <Icon color={isOnTheDiet ? COLORS.green_dark : COLORS.red_dark} />
        <Percentage percentageValue={98.87} />
      </StatisticsCard>
      <Meals>
        <Title>Refeições</Title>
        <Button
          title="Nova refeição"
          type="Primary"
          icon={<Plus size={18} color={COLORS.WHITE} />}
          onPress={() => navigation.navigate("describe")}
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
