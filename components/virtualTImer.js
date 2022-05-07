import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { strings } from "../config";
import { formatNumberForTimer } from "../utils";

const VirtualTimer = ({ hour, minutes }) => {
  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timeText}>{strings.VIRTUAL_TIMER}</Text>
      <Text style={styles.time}>{formatNumberForTimer(hour)}</Text>
      <Text style={styles.time}>{formatNumberForTimer(minutes)}</Text>
      <Text style={styles.time}>00</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  time: {
    color: "red",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  timeText: {
    color: "black",
    fontSize: 20,
  },
  timerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    color: "#111",
    fontSize: 30,
    marginTop: 20,
  },
});

export default VirtualTimer;
