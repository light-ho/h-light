import * as React from "react";

import { View, Text, StyleSheet } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/screens";

import { VictoryChart, VictoryBar, VictoryTheme } from "victory-native";
import { GLOBALVALUES } from "../globalstyle";
import Tile from "../components/tile";
import { getData, STORAGEKEYS } from "../utils/asyncStorage";
import { useEffect, useState } from "react";
import { LatLng } from "react-native-maps";

type Props = NativeStackScreenProps<RootStackParamList, "FirstPage">;

const avg = (arr: number[]) => {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
};

export default function FirstPage({ navigation }: Props) {
  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
  ];

  const [markedLocation, setMarkedLocation] = useState<LatLng | undefined>(
    undefined
  );
  const [solarCost, setSolarCost] = useState(undefined);
  const [monthlyBills, setMonthlyBills] = useState(undefined);

  useEffect(() => {
    getData(STORAGEKEYS.location).then((location) => {
      if (location) {
        setMarkedLocation(JSON.parse(location));
      }
    });

    getData(STORAGEKEYS.solarCost).then((solarCost) => {
      if (solarCost) {
        setSolarCost(JSON.parse(solarCost));
      }
    });

    getData(STORAGEKEYS.MonthlyBills).then((MonthlyBills) => {
      if (MonthlyBills) {
        setMonthlyBills(JSON.parse(MonthlyBills));
      }
    });
  }, []);

  const location_formatted = markedLocation
    ? `${markedLocation.latitude}, ${markedLocation.longitude}`
    : "No location";
  const cost_formatted = solarCost ? `${solarCost} K` : "cost not set";
  const bills_formatted = monthlyBills
    ? `${avg(monthlyBills)} K`
    : "history cost not set";

  return (
    <View style={styles.container}>
      <View style={styles.tileContainer}>
        <Tile
          onPress={() => navigation.navigate("LocationPage")}
          title="location"
          content={location_formatted}
        />

        <Tile
          onPress={() => navigation.navigate("OtherPage")}
          title="solar cost"
          content={cost_formatted}
        />

        <Tile
          onPress={() => navigation.navigate("OtherPage")}
          title="current system"
          content={bills_formatted}
        />
      </View>
      <View style={styles.reportContatiner}>
        <Text style={{ fontSize: 20 }}>report</Text>
        <VictoryChart width={350} theme={VictoryTheme.material}>
          <VictoryBar data={data} x="quarter" y="earnings" />
        </VictoryChart>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  tileContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "space-around",
  },
  reportContatiner: {
    flex: 2,
    backgroundColor: GLOBALVALUES.primeColor,
    alignItems: "center",
  },
});
