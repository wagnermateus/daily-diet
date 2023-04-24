import { Container, StatusBallStyleProps } from "./styles";

export function StatusBall({ isOnTheDiet }: StatusBallStyleProps) {
  return <Container isOnTheDiet={isOnTheDiet} />;
}
