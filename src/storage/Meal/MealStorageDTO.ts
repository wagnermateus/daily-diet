export type MealStorageDTO = {
  date: string;
  data: {
    name: string;
    hour: string;
    isOnTheDiet: boolean;
    description: string;
  }[];
}[];
