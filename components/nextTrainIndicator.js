import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { data } from "./data";

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
    }, 1000);
  }, []);

  useEffect(() => {
    setMinutes((minutes + 1) % 60);
    if (minutes == 59) {
      setHour((hour + 1) % 24);
    }
  }, [seconds]);

  useEffect(() => {
    calcTrainArrivalTime();
  }, [minutes]);

  const calcTrainArrivalTime = () => {
    let trainData = [];
    data.forEach((train, index) => {
      const { startTime, endTime, frequency, destination } = train;
      const currentTime = 60 * hour + minutes;
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
      (item) => item.arrivalTime > 0 && item.arrivalTime <= 15
    );
    trainData.sort((a, b) => a.arrivalTime - b.arrivalTime);
    setFTrains(trainData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.trainContainer}>
        <View style={styles.train}>
          <Text style={styles.oderHeader}>Order</Text>
          <Text style={styles.destinationHeader}>Destination</Text>
          <Text style={styles.arrivalTimeHeader}>Arrival Time</Text>
        </View>
        {fTrains.length ? (
          fTrains.map((item, index) => {
            return (
              <View key={index} style={styles.train}>
                <Text style={styles.order}>{index + 1}</Text>
                <Text style={styles.destination}>{item.destination}</Text>
                <Text style={styles.arrivalTime}>{item.arrivalTime}</Text>
                {item.arrivalTime == 1 ? (
                  <Text style={styles.minText}>min</Text>
                ) : (
                  <Text style={styles.minText}>mins</Text>
                )}
              </View>
            );
          })
        ) : (
          <View style={styles.description}>
            <Text style={styles.descriptionText}>
              No trains within 15 minutes.
            </Text>
            <Text style={styles.descriptionText}>Trains are coming soon.</Text>
          </View>
        )}
      </View>
      <View style={styles.timerContainer}>
        <Text style={styles.timeText}>Virtual Timer </Text>
        <Text style={styles.time}>{hour < 10 ? "0" + hour : hour}</Text>
        <Text style={styles.time}> : </Text>
        <Text style={styles.time}>
          {minutes < 10 ? "0" + minutes : minutes}
        </Text>
        <Text style={styles.time}> : </Text>
        <Text style={styles.time}>00</Text>
      </View>
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
    width: "25%",
    textAlign: "right",
    fontSize: 15,
  },
  arrivalTimeHeader: {
    width: "40%",
    textAlign: "right",
    fontSize: 18,
    fontWeight: "bold",
  },
  minText: {
    width: "15%",
    textAlign: "right",
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
