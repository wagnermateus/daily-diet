import AsyncStorage from "@react-native-async-storage/async-storage";
import { mealGetAll } from "./mealGetAll";
import { MEAL_COLLECTION } from "../storageConfig";

type Props = {
  name: string;
  hour: string;
  description: string;
  isOnTheDiet: boolean;
};

export async function mealCreate(
  { description, hour, name, isOnTheDiet }: Props,
  date: string
) {
  try {
    const stored = await mealGetAll();

    const newMealDateAlreadyExists = stored.filter(
      (meal) => meal.date === date
    );

    if (newMealDateAlreadyExists.length > 0) {
      const updateDateWithNewMeal = stored.map((meal) => {
        if (meal.date === date) {
          meal.data.push({ name, description, hour, isOnTheDiet });
        }
        return meal;
      });

      const storage = JSON.stringify(updateDateWithNewMeal);

      await AsyncStorage.setItem(MEAL_COLLECTION, storage);
    } else {
      const newMeal = {
        date: date,
        data: [
          {
            name: name,
            hour: hour,
            isOnTheDiet: isOnTheDiet,
            description: description,
          },
        ],
      };
      const storage = JSON.stringify([...stored, newMeal]);
      await AsyncStorage.setItem(MEAL_COLLECTION, storage);
    }
  } catch (error) {
    throw error;
  }
}
