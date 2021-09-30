import * as React from "react";

import { View, Text, Button, StyleSheet } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/screens";

type Props = NativeStackScreenProps<RootStackParamList, "FirstPage">;

export default function FirstPage({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to other page"
        onPress={() => navigation.navigate("OtherPage")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});
