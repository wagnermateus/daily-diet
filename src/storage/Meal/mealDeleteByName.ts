import AsyncStorage from "@react-native-async-storage/async-storage";
import { mealGetAll } from "./mealGetAll";
import { MEAL_COLLECTION } from "../storageConfig";
import { MealStorageDTO } from "./MealStorageDTO";

export async function mealDeleteByName(name: string) {
  try {
    const storage = await mealGetAll();

    let mealsWithoutTheDeleted: MealStorageDTO = [];

    mealsWithoutTheDeleted = storage.map((item) => {
      for (let i = 0; i < item.data.length; i++) {
        if (item.data[i].name === name) {
          item.data.splice(i, 1);
        }
      }
      return item;
    });
    //Remove all arrays without meals only dates
    const noMealDateFilter = mealsWithoutTheDeleted.filter(
      (item) => item.data.length > 0
    );

    const meals = JSON.stringify(noMealDateFilter);

    await AsyncStorage.setItem(MEAL_COLLECTION, meals);
  } catch (error) {
    throw error;
  }
}
