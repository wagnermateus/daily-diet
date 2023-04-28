export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      statistics: {
        totalMeals: number;
        percentage: number;
        totalMealsOnTheDiet: number;
        isOnTheDiet: boolean;
      };
      describe: {
        mealName: string;
      };
      feedback: {
        isOnTheDiet: boolean;
      };
      meal: {
        name: string;
      };
    }
  }
}
