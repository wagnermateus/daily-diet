import { Container, Description, Value } from "./styles";

type Props = {
  value: number;
  description: string;
};

export function StatisticsData({ value, description }: Props) {
  return (
    <Container>
      <Value>{value}</Value>
      <Description>{description}</Description>
    </Container>
  );
}
