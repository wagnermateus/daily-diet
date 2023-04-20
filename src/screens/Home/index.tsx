import { Image } from "react-native";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.png";

import { Container, Header } from "./styles";

export function Home() {
  return (
    <Container>
      <Header>
        <Image source={logo} />
        <Image source={avatar} />
      </Header>
    </Container>
  );
}
