import * as React from "react";

import { View, Text, Button, StyleSheet } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/screens";

type Props = NativeStackScreenProps<RootStackParamList, "FirstPage">;

export default function OtherPage({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text>i am other page</Text>
      <Button title="go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});
