import { View } from "react-native";
import { Input } from "../../components/Input";
import { Container } from "./styles";

export function NewMeal() {
  return (
    <Container>
      <Input label="Nome" height={48} />
      <Input label="Descrição" height={120} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <Input label="Data" height={48} width={140} />

        <Input label="Hora" height={48} width={140} />
      </View>
    </Container>
  );
}
