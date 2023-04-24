import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { DescribeMeal } from "../screens/DescribeMeal";
import { Statistics } from "../screens/ Statistics";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="describe" component={DescribeMeal} />
      <Screen name="statistics" component={Statistics} />
    </Navigator>
  );
}
