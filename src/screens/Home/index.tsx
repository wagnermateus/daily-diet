import { Image } from "react-native";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.png";

import { Container, Header, Meals, Title } from "./styles";
import { Percentage } from "../../components/Percentage";
import { Button } from "../../components/Button";
import { Plus } from "phosphor-react-native";
import { useTheme } from "styled-components/native";

export function Home() {
  const { COLORS } = useTheme();
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
      </Meals>
    </Container>
  );
}
