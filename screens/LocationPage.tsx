import * as React from "react";

import { View, Text, Button, StyleSheet } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/screens";
import LocationFinder from "../components/LocationFinder";

type Props = NativeStackScreenProps<RootStackParamList, "LocationPage">;

export default function LocationPage(props: Props) {
  return (
    <View style={styles.container}>
      <LocationFinder />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});
