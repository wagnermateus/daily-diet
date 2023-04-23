import { TouchableOpacity } from "react-native";
import { Container, Icon, Title } from "./styles";
import { useNavigation } from "@react-navigation/native";

type Props = {
  title: string;
};

export function MealHeader({ title }: Props) {
  const navigation = useNavigation();
  return (
    <Container>
      <TouchableOpacity onPress={() => navigation.navigate("home")}>
        <Icon />
      </TouchableOpacity>

      <Title>{title}</Title>
    </Container>
  );
}
