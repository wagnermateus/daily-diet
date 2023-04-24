import { Image, SectionList, View, Text } from "react-native";
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
import { useState } from "react";
import { MealCard } from "../../components/MealCard";
import { DateOfMeals } from "../../components/DateOfMeals";
import { useNavigation } from "@react-navigation/native";

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
  const navigation = useNavigation();
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
  const [isOnTheDiet, setIsOnTheDiet] = useState(true);
  return (
    <Container>
      <Header>
        <Image source={logo} />
        <Image source={avatar} />
      </Header>
      <StatisticsCard isOnTheDiet={isOnTheDiet}>
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
