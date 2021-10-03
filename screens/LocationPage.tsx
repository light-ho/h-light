import * as React from "react";

import { View, StyleSheet, Button } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/screens";
import LocationFinder from "../components/LocationFinder";

type Props = NativeStackScreenProps<RootStackParamList, "LocationPage">;

export default function LocationPage(props: Props) {
  return (
    <View style={styles.container}>
      <LocationFinder />
      <Button title="done" onPress={() => props.navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});
