export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      statistics: undefined;
      "new/edit":
        | undefined
        | {
            mealData: string;
          };
      feedback: undefined;
      meal: {
        name: string;
      };
    }
  }
}
