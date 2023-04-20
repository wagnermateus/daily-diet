import { Image } from "react-native";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.png";
import { Text } from "react-native";
import { Container, Header, Meals, Title } from "./styles";
import { Percentage } from "../../components/Percentage";
import { Button } from "../../components/Button";

export function Home() {
  return (
    <Container>
      <Header>
        <Image source={logo} />
        <Image source={avatar} />
      </Header>
      <Percentage />
      <Meals>
        <Title>Refeições</Title>
        <Button title="Nova refeição" type="Secondary" />
      </Meals>
    </Container>
  );
}
