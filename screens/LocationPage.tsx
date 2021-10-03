import * as React from "react";

import { View, StyleSheet, Button } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/screens";
import LocationFinder from "../components/LocationFinder";
import { GLOBALVALUES } from "../globalstyle";

type Props = NativeStackScreenProps<RootStackParamList, "LocationPage">;

export default function LocationPage(props: Props) {
  return (
    <View style={styles.container}>
      <LocationFinder />
      <View style={styles.done}>
        <Button
          title="done"
          onPress={() => props.navigation.goBack()}
          color={GLOBALVALUES.thirdColor}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  done: {
    flex: 1,
    marginTop: 550,
    marginHorizontal: 30,
    backgroundColor: GLOBALVALUES.backgroudColor,
  },
});
