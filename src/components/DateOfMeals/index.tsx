import { Container } from "./styles";

type Props = {
  date: string;
};

export function DateOfMeals({ date }: Props) {
  return <Container>{date}</Container>;
}
