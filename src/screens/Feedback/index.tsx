import { BoldText, Container, Subtitle, Title } from "./styles";
import { Image } from "react-native";
import positiveFeedbackIllustration from "../../assets/positiveFeedbackIllustration.png";
import negativeFeedbackIllustration from "../../assets/negativeFeedbackIllustration.png";
import { Button } from "../../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Loading } from "../../components/Loading";

type RouteParams = {
  isOnTheDiet: boolean;
};

export function Feedback() {
  const route = useRoute();
  const navigation = useNavigation();

  const { isOnTheDiet } = route.params as RouteParams;

  if (isOnTheDiet === undefined) {
    return <Loading />;
  }
  return (
    <Container>
      {isOnTheDiet ? (
        <>
          <Title isOnTheDiet={isOnTheDiet}>Continue assim!</Title>
          <Subtitle>
            Você continua <BoldText>dentro da dieta</BoldText>. Muito bem!
          </Subtitle>
          <Image source={positiveFeedbackIllustration} />
        </>
      ) : (
        <>
          <Title isOnTheDiet={isOnTheDiet}>Que pena!</Title>
          <Subtitle>
            Você <BoldText>saiu da dieta</BoldText> dessa vez, mas continue se
            esforçando e não desista!
          </Subtitle>
          <Image source={negativeFeedbackIllustration} />
        </>
      )}
      <Button
        title="Ir para a página inicial"
        style={{ marginTop: 32 }}
        onPress={() => navigation.navigate("home")}
      />
    </Container>
  );
}
