export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      statistics: undefined;
      describe:
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
