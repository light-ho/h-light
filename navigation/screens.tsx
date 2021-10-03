// write the page routes here and there props

import { LatLng } from "react-native-maps";

// ref https://reactnavigation.org/docs/typescript/#type-checking-the-navigator
export type RootStackParamList = {
  Home: undefined;
  solarCost: undefined;
  LocationPage: undefined;
  GraphScreen: { cords: LatLng };
  CostEntryScreen: undefined;
};
