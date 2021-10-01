import * as React from "react";

import { View, Text, Button, StyleSheet } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/screens";

import { VictoryChart, VictoryBar, VictoryTheme } from "victory-native";

type Props = NativeStackScreenProps<RootStackParamList, "FirstPage">;

export default function FirstPage({ navigation }: Props) {
  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
  ];
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to other page"
        onPress={() => navigation.navigate("OtherPage")}
      />
      <VictoryChart width={350} theme={VictoryTheme.material}>
        <VictoryBar data={data} x="quarter" y="earnings" />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});
