import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GLOBALVALUES } from "../globalstyle";

function Tile(props: { onPress: () => void; title: string; content: string }) {
  return (
    <View style={styles.tileContainer}>
      <Pressable onPress={props.onPress} style={styles.pressArea}>
        <Text style={styles.tileText}>{props.title}</Text>
        <Text style={{}}>{props.content}</Text>
      </Pressable>
    </View>
  );
}

export default Tile;

const styles = StyleSheet.create({
  tileContainer: {
    padding: 10,
    backgroundColor: GLOBALVALUES.primeColor,
    height: 120,
    minWidth: "46%",
  },
  pressArea: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
  },
  tileText: {
    color: GLOBALVALUES.secondryColor,
  },
  contentText: {
    color: GLOBALVALUES.secondryColor,
    fontWeight: "bold",
  },
});
