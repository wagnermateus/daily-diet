import { useState } from "react";
import { MealHeader } from "../../components/MealHeader";
import { Container, Content } from "./styles";
import { Button } from "../../components/Button";
import { PencilSimpleLine, Trash } from "phosphor-react-native";
import { useTheme } from "styled-components/native";

export function Meal() {
  const [isOnTheDiet, setIsOnTheDiet] = useState(true);
  const { COLORS } = useTheme();
  return (
    <Container isOnTheDiet={isOnTheDiet}>
      <MealHeader title="Refeição" />
      <Content>
        <Button
          title="Editar refeição"
          icon={<PencilSimpleLine size={18} color={COLORS.WHITE} />}
        />

        <Button
          title="Excluir refeição"
          type="Secondary"
          icon={<Trash size={18} color={COLORS.gray_100} />}
        />
      </Content>
    </Container>
  );
}
