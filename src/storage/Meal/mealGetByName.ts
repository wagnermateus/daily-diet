import { mealGetAll } from "./mealGetAll";

export type StoredMealProps = {
  date: string;
  data: {
    name: string;
    hour: string;
    isOnTheDiet: boolean;
    description: string;
  };
};
export async function mealGetByName(name: string) {
  try {
    const storage = await mealGetAll();
    let meal: StoredMealProps = {
      date: "",
      data: {
        name: "",
        hour: "",
        isOnTheDiet: true,
        description: "",
      },
    };

    for (let i = 0; i < storage.length; i++) {
      for (let x = 0; x < storage[i].data.length; x++)
        if (storage[i].data[x].name === name) {
          meal = { date: storage[i].date, data: storage[i].data[x] };
        }
    }

    return meal;
  } catch (error) {
    throw error;
  }
}
