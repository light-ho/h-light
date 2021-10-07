import * as React from "react";

import { View, StyleSheet } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/screens";

import { GLOBALVALUES } from "../globalstyle";
import Tile from "../components/tile";
import { useEffect, useState } from "react";
import { POWER } from "../services/POWER";
import SolarChart from "../components/Chart";
import SolarTable from "../components/SolarTable";
import { useGlobalContext } from "../context/homeContext";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const avg = (arr: number[]) => {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
};
export type t2mDataType = { date: string; value: number }[];
export default function FirstPage({ navigation }: Props) {
  const { markedLocation, monthlyBills, solarCost } = useGlobalContext();
  const [data, setData] = useState<t2mDataType | undefined>(undefined);

  // update graph data when location change
  useEffect(() => {
    if (markedLocation) {
      const power = new POWER();
      power
        .getUpdatedUrl({
          long: markedLocation.longitude,
          lat: markedLocation.latitude,
          from: new Date(new Date().setFullYear(new Date().getFullYear() - 2)),
          to: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
          resolution: "monthly",
        })
        .then((res) => {
          // console.log(res)
          const t2m_data = res.properties.parameter.T2M;
          const t2m_object = Object.keys(t2m_data).map((k) => {
            return {
              date: k.split(/.{4}/)[1],
              value: t2m_data[k],
            };
          });
          setData(t2m_object);
        });
    }
  }, [markedLocation]);

  const location_formatted = markedLocation
    ? `${markedLocation.latitude.toFixed(
        4
      )}, ${markedLocation.longitude.toFixed(4)}`
    : "No location";
  const cost_formatted = solarCost ? `${solarCost} K` : "cost not set";
  const bills_formatted = monthlyBills
    ? `${avg(monthlyBills).toPrecision(4)} $`
    : "history cost not set";

  console.log("home log *------------------------*");
  console.log(location_formatted);
  console.log(cost_formatted);
  console.log(bills_formatted);

  return (
    <View style={styles.container}>
      <View style={styles.tileContainer}>
        <Tile
          onPress={() => navigation.navigate("LocationPage")}
          title="location"
          content={location_formatted}
        />

        <Tile
          onPress={() => navigation.navigate("solarCost")}
          title="solar cost"
          content={cost_formatted}
        />

        <Tile
          onPress={() => navigation.navigate("CostEntryScreen")}
          title="current system"
          content={bills_formatted}
        />
      </View>
      {data && (
        <View style={styles.reportContatiner}>
          <SolarChart data={data} />
          <SolarTable data={data} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  tileContainer: {
    height: "35%",
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
