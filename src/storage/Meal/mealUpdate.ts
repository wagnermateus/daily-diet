import AsyncStorage from "@react-native-async-storage/async-storage";
import { mealGetAll } from "./mealGetAll";
import { mealGetByName } from "./mealGetByName";
import { MEAL_COLLECTION } from "../storageConfig";

type Props = {
  name: string;
  hour: string;
  description: string;
  isOnTheDiet: boolean;
};

export async function mealUpdate(
  { name, description, hour, isOnTheDiet }: Props,
  date: string,
  mealName: string
) {
  try {
    const meal = await mealGetByName(mealName);
    const stored = await mealGetAll();

    for (let i = 0; i < stored.length; i++) {
      for (let x = 0; x < stored[i].data.length; x++) {
        if (stored[i].data[x].name === meal.data.name) {
          if (meal.date !== date) {
            //Remove meal from array

            stored[i].data.splice(x, 1);

            const objectThatContainsTheDate = stored.find(
              (item) => item.date === date
            );

            if (objectThatContainsTheDate === undefined) {
              //Add the meal to another array

              stored.push({
                date: date,
                data: [
                  {
                    name: name,
                    description: description,
                    hour: hour,
                    isOnTheDiet: isOnTheDiet,
                  },
                ],
              });
            } else {
              const indexOfTheObjectContainingTheDate = stored.indexOf(
                objectThatContainsTheDate
              );

              stored[indexOfTheObjectContainingTheDate].data.push({
                name: name,
                description: description,
                hour: hour,
                isOnTheDiet: isOnTheDiet,
              });
            }
          } else {
            stored[i].data.splice(x, 1, {
              name: name,
              description: description,
              hour: hour,
              isOnTheDiet: isOnTheDiet,
            });
          }
        }
      }
    }

    const noMealDateFilter = stored.filter((item) => item.data.length > 0);

    const meals = JSON.stringify(noMealDateFilter);

    await AsyncStorage.setItem(MEAL_COLLECTION, meals);
  } catch (error) {
    throw error;
  }
}
