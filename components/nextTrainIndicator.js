import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import data from "../config/data";
import constants from "../config/constants";
import strings from "../config/string";
import numberToMinute from "../utils/numberToMinute";
import VirtualTimer from "./virtualTImer";

const NextTrainIndicator = () => {
  const [hour, setHour] = useState(5);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [trains, setTrains] = useState(() => {
    let array = [];
    data.forEach((item) => {
      array.push({
        arrivalTime: 0,
        destination: item.destination,
      });
    });
    return array;
  });
  const [fTrains, setFTrains] = useState([]);

  useEffect(() => {
    setInterval(() => {
      setSeconds(new Date().getSeconds());
    }, constants.MILLISECONDS_PER_SECOND);
  }, []);

  useEffect(() => {
    setMinutes((minutes + 1) % constants.MINUTES_PER_HOUR);
    if (minutes == constants.MINUTES_PER_HOUR - 1) {
      setHour((hour + 1) % constants.HOURS_PER_DAY);
    }
  }, [seconds]);

  useEffect(() => {
    calcTrainArrivalTime();
  }, [minutes]);

  const calcTrainArrivalTime = () => {
    let trainData = [];
    data.forEach((train, index) => {
      const { startTime, endTime, frequency, destination } = train;
      const currentTime = constants.MINUTES_PER_HOUR * hour + minutes;
      let item = {};
      let condition =
        startTime < endTime
          ? currentTime >= startTime && currentTime <= endTime
          : currentTime >= startTime || currentTime <= endTime;
      if (condition) {
        if (trains[index].arrivalTime <= 0) {
          item.arrivalTime = frequency;
          item.destination = destination;
        } else {
          item.arrivalTime = trains[index].arrivalTime - 1;
          item.destination = destination;
        }
      } else {
        item.arrivalTime = 0;
        item.destination = destination;
      }
      trainData.push(item);
    });
    setTrains(trainData);

    trainData = trainData.filter(
      (item) =>
        item.arrivalTime > constants.MIN_TIME &&
        item.arrivalTime <= constants.MAX_TIME
    );
    trainData.sort((a, b) => a.arrivalTime - b.arrivalTime);
    setFTrains(trainData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.trainContainer}>
        <View style={styles.train}>
          <Text style={styles.oderHeader}>{strings.ORDER}</Text>
          <Text style={styles.destinationHeader}>{strings.DESTINATION}</Text>
          <Text style={styles.arrivalTimeHeader}>
            {strings.ARRIVING_TRAINS}
          </Text>
        </View>
        {fTrains.length ? (
          fTrains.map((item, index) => {
            return (
              <View key={index} style={styles.train}>
                <Text style={styles.order}>{index + 1}</Text>
                <Text style={styles.destination}>{item.destination}</Text>
                <Text style={styles.arrivalTime}>
                  {numberToMinute(item.arrivalTime)}
                </Text>
              </View>
            );
          })
        ) : (
          <View style={styles.description}>
            <Text style={styles.descriptionText}>
              {strings.NTI_DESCRIPTION1}
            </Text>
            <Text style={styles.descriptionText}>
              {strings.NTI_DESCRIPTION2}
            </Text>
          </View>
        )}
      </View>
      <VirtualTimer hour={hour} minutes={minutes} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    paddingTop: "3%",
    backgroundColor: "#e3e3e3",
    marginRight: "5%",
    marginLeft: "5%",
    height: "90%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.9,
    paddingTop: 10,
  },
  timeText: {
    color: "black",
    fontSize: 20,
  },
  description: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  descriptionText: {
    textAlign: "center",
  },
  trainContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: 150,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10,
  },
  train: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
  order: {
    width: "20%",
  },
  oderHeader: {
    width: "20%",
    fontSize: 18,
    fontWeight: "bold",
  },
  destination: {
    width: "40%",
    fontSize: 15,
  },
  destinationHeader: {
    width: "40%",
    fontSize: 18,
    fontWeight: "bold",
  },
  arrivalTime: {
    width: "40%",
    textAlign: "right",
    fontSize: 15,
  },
  arrivalTimeHeader: {
    width: "40%",
    textAlign: "right",
    fontSize: 18,
    fontWeight: "bold",
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
  time: {
    color: "red",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  transparentText: {
    fontSize: 20,
    opacity: 0,
  },
});

export default NextTrainIndicator;
