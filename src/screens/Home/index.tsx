import { Image, SectionList, View, Text, SafeAreaView } from "react-native";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.png";

import { Container, Header, Meals, MealsList, Title } from "./styles";
import { Percentage } from "../../components/Percentage";
import { Button } from "../../components/Button";
import { Plus } from "phosphor-react-native";
import { useTheme } from "styled-components/native";
import { useState } from "react";
import { MealCard } from "../../components/MealCard";
import { DateOfMeals } from "../../components/DateOfMeals";

type MealsProps = {
  date: string;
  data: {
    name: string;
    hour: string;
    isOnTheDiet: boolean;
  }[];
}[];

export function Home() {
  const { COLORS } = useTheme();
  const [meals, setMeals] = useState<MealsProps>([
    {
      date: "10.04.23",
      data: [
        {
          hour: "12:00",
          isOnTheDiet: true,
          name: "Funge com peito alto",
        },
        {
          hour: "14:00",
          isOnTheDiet: false,
          name: "Frango grelhado",
        },
      ],
    },
    {
      date: "12.04.23",
      data: [
        {
          hour: "08:00",
          isOnTheDiet: true,
          name: "Pão com manteiga",
        },
        {
          hour: "13:00",
          isOnTheDiet: true,
          name: "Caldeirada",
        },
      ],
    },
    {
      date: "13.04.23",
      data: [
        {
          hour: "08:00",
          isOnTheDiet: false,
          name: "Leite sem açucar",
        },
        {
          hour: "13:00",
          isOnTheDiet: false,
          name: "Feijão com banana",
        },
        {
          hour: "15:00",
          isOnTheDiet: true,
          name: "Galinha rija",
        },
      ],
    },
  ]);

  return (
    <Container>
      <Header>
        <Image source={logo} />
        <Image source={avatar} />
      </Header>
      <Percentage />
      <Meals>
        <Title>Refeições</Title>
        <Button
          title="Nova refeição"
          type="Primary"
          icon={<Plus size={18} color={COLORS.WHITE} />}
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
              />
            )}
            renderSectionHeader={({ section: { date } }) => (
              <DateOfMeals date={date} />
            )}
            showsVerticalScrollIndicator={false}
            SectionSeparatorComponent={() => <View style={{ height: 8 }} />}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          />
        </MealsList>
      </Meals>
    </Container>
  );
}
