import * as React from "react";

import { View, Text, Button, StyleSheet, TextInput } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/screens";
import { useState, useEffect } from "react";
import { STORAGEKEYS, storeData } from "../utils/asyncStorage";
import { GLOBALVALUES } from '../globalstyle';

type Props = NativeStackScreenProps<RootStackParamList, "solarCost">;

export default function OtherPage({ navigation }: Props) {
  const [solarCost, setSolarCost] = useState<string | undefined>(undefined);

  useEffect(() => {
    async () => {
      if (solarCost) {
        console.log(solarCost)
        await storeData(STORAGEKEYS.solarCost, solarCost);
      }
    };
  }, [solarCost]);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, margin: 20 }}>
        the cost of solar system?
      </Text>
      <TextInput
        style={{ fontSize: 20, margin: 20 }}
        value={solarCost}
        onChangeText={setSolarCost}
        keyboardType={"number-pad"}
        placeholder={"0"}
      />
      <Button 
      title="done" 
      color={GLOBALVALUES.thirdColor}
      onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});
