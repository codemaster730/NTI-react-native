import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import NextTrainIndicator from "./components/nextTrainIndicator";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Next Train Indicator</Text>
      </View>
      <NextTrainIndicator />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#e3e3e3'
  },
  header: {
    width: "100%",
    height: "10%",
    backgroundColor: "grey",
    display: "flex",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 26,
    paddingLeft: 10
  }
});
