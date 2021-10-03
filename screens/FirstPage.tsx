import * as React from "react";

import { View, Text, StyleSheet } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/screens";

import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryGroup,
} from "victory-native";
import { GLOBALVALUES } from "../globalstyle";
import Tile from "../components/tile";
import { getData, STORAGEKEYS } from "../utils/asyncStorage";
import { useEffect, useState } from "react";
import { LatLng } from "react-native-maps";
import { IPOWER, POWER } from "../services/POWER";
import { MonthlyData as MonthlyBills } from "./CostEntry";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const avg = (arr: number[]) => {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
};
type t2mDataType = { date: string; value: number }[];
export default function FirstPage({ navigation }: Props) {
  const [markedLocation, setMarkedLocation] = useState<LatLng | undefined>(
    undefined
  );
  const [solarCost, setSolarCost] = useState(undefined);
  const [monthlyBills, setMonthlyBills] = useState<t2mDataType | undefined>(
    undefined
  );

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
        const obj = JSON.parse(MonthlyBills);
        Object.keys(obj).map((k) => {
          return {
            data: k,
            value: obj[k],
          };
        });
        setMonthlyBills(obj);
      }
    });
  }, []);

  const [data, setData] = useState<t2mDataType | undefined>(undefined);

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
          const t2m_data = res.properties.parameter.T2M;
          const t2m_object = Object.keys(t2m_data)
            .filter((k) => k.split(/.{4}/)[1] !== "13")
            .map((k) => {
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
    ? `${markedLocation.latitude}, ${markedLocation.longitude}`
    : "No location";
  const cost_formatted = solarCost ? `${solarCost} K` : "cost not set";
  const bills_formatted = monthlyBills
    ? // @ts-ignore // ignore the type for now
      `${avg(Object.keys(monthlyBills).map((bill) => monthlyBills[bill]))} K`
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
          <Text style={{ fontSize: 20 }}>report</Text>
          <VictoryChart width={350}>
            <VictoryGroup offset={20} colorScale={"qualitative"}>
              <VictoryBar data={data} x="date" y="value" />
              <VictoryBar data={monthlyBills} x="data" y="value" />
            </VictoryGroup>
          </VictoryChart>
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
