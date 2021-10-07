import React from "react";
import { Text } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { t2mDataType } from "../screens/FirstPage";

function SolarChart({ data }: { data: t2mDataType }) {
  return (
    <>
      <Text style={{ fontSize: 20 }}>report</Text>
      <VictoryChart width={350} theme={VictoryTheme.material}>
        <VictoryBar data={data} x="date" y="value" />
      </VictoryChart>
    </>
  );
}

export default SolarChart;
