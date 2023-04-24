import { TouchableOpacity, View } from "react-native";
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
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { useState } from "react";
import { StatisticsData } from "../../components/StatisticsData";

export function Statistics() {
  const navigation = useNavigation();
  const { COLORS } = useTheme();

  const [isOnTheDiet, setIsOnTheDiet] = useState(true);
  return (
    <Container isOnTheDiet={isOnTheDiet}>
      <Header>
        <TouchableOpacity onPress={() => navigation.navigate("home")}>
          <Icon color={isOnTheDiet ? COLORS.green_dark : COLORS.red_dark} />
        </TouchableOpacity>
        <Percentage percentageValue={98.87} />
      </Header>
      <Content>
        <Title>Estatísticas gerais</Title>
        <DataContainer>
          <DataContent>
            <StatisticsData
              value={22}
              description="melhor sequência de pratos dentro da dieta"
            />
          </DataContent>
          <DataContent>
            <StatisticsData value={109} description="refeições registradas" />
          </DataContent>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <DataContent
              style={{ width: 157.5, backgroundColor: COLORS.green_light }}
            >
              <StatisticsData
                value={99}
                description="refeições dentro da dieta"
              />
            </DataContent>
            <DataContent
              style={{ width: 157.5, backgroundColor: COLORS.red_light }}
            >
              <StatisticsData
                value={10}
                description="refeições fora da dieta"
              />
            </DataContent>
          </View>
        </DataContainer>
      </Content>
    </Container>
  );
}
