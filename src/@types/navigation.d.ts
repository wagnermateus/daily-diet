export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      statistics: {
        percentage: number;
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
