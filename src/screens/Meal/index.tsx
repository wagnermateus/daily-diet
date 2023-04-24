import { useState } from "react";
import { MealHeader } from "../../components/MealHeader";
import {
  Container,
  Content,
  Description,
  MealInfo,
  StatusBox,
  Subtitle,
  Title,
} from "./styles";
import { Button } from "../../components/Button";
import { PencilSimpleLine, Trash } from "phosphor-react-native";
import { useTheme } from "styled-components/native";
import { StatusBall } from "../../components/StatusBall";
import { View } from "react-native";

export function Meal() {
  const [isOnTheDiet, setIsOnTheDiet] = useState(false);
  const { COLORS } = useTheme();
  return (
    <Container isOnTheDiet={isOnTheDiet}>
      <MealHeader title="Refeição" />
      <Content>
        <MealInfo>
          <Title>Sanduíche</Title>
          <Description>
            Sanduíche de pão integral com atum e salada de alface e tomate
          </Description>
          <Subtitle>Data e hora</Subtitle>
          <Description>12/08/2022 às 16:00</Description>
          <StatusBox>
            <StatusBall isOnTheDiet={isOnTheDiet} />
            <Description>
              {isOnTheDiet ? "dentro da dieta" : "fora da dieta"}
            </Description>
          </StatusBox>
        </MealInfo>
        <View>
          <Button
            title="Editar refeição"
            icon={<PencilSimpleLine size={18} color={COLORS.WHITE} />}
          />

          <Button
            title="Excluir refeição"
            type="Secondary"
            icon={<Trash size={18} color={COLORS.gray_100} />}
          />
        </View>
      </Content>
    </Container>
  );
}
