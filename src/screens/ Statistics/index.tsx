import { TouchableOpacity } from "react-native";
import { Percentage } from "../../components/Percentage";
import { Container, Content, Header, Icon } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { useState } from "react";

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
      <Content></Content>
    </Container>
  );
}
