import * as React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/screens";

type Props = NativeStackScreenProps<RootStackParamList, "GraphScreen">;
export default function GraphScreen({navigation, route: {params: {cords}}}: Props) {
	// TODO 
	// - [] call power service 
	// - get the data and plot them
  return <>
	
  </>;
}
