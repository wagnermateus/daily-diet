import { Container, Title } from "./styles";

type Props = {
  title: string;
  type?: "Primary" | "Secondary";
};
export function Button({ title, type = "Primary" }: Props) {
  return (
    <Container type={type}>
      <Title>{title}</Title>
    </Container>
  );
}
