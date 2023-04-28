import { Container, Subtitle, Title } from "./styles";

type Props = {
  percentageValue: number;
};

export function Percentage({ percentageValue }: Props) {
  return (
    <Container>
      <Title>{percentageValue}%</Title>
      <Subtitle>das refeições dentro da dieta</Subtitle>
    </Container>
  );
}
