import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  Button,
  View,
  TouchableOpacity,
} from "react-native";
import Data from "./assets/timezones.json";

export default function App() {
  const [dateString, setDateString] = useState("");
  const [hourString, setHourString] = useState("");
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      updateDate();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const onPressHandler = () => {
    setShowList(!showList);
  };

  const mapData = () => {
    let answer = Data.map(
      ({ value, abbr, offset, isdst, text, utc }: ITimeZone, index) => (
        <TouchableOpacity style={styles.timeZone} onPress={onPressHandler}>
          <Text style={styles.timeZoneText} key={index}>
            {value}, offset: {offset}
          </Text>
        </TouchableOpacity>
      )
    );

    return answer;
  };

  const updateDate = () => {
    let date = new Date();

    let hours: number = date.getHours();
    let minutes: number = date.getMinutes();
    let seconds: number = date.getSeconds();

    let year: number = date.getFullYear();
    let month: number = date.getMonth() + 1;
    let day: number = date.getDate();

    let stringHours: string =
      hours < 10 ? "0" + hours.toString() : hours.toString();
    let stringMinutes: string =
      minutes < 10 ? "0" + minutes.toString() : minutes.toString();
    let stringSeconds: string =
      seconds < 10 ? "0" + seconds.toString() : seconds.toString();

    let stringYear: string = year.toString();
    let stringMonth: string =
      month < 10 ? "0" + month.toString() : month.toString();
    let stringDay: string = day < 10 ? "0" + day.toString() : day.toString();

    setDateString(`${stringYear}-${stringMonth}-${stringDay}`);
    setHourString(`${stringHours}:${stringMinutes}:${stringSeconds}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.clock}>{dateString}</Text>
      <Text style={styles.clock}>{hourString}</Text>
      <Button
        title="Change time Zone"
        onPress={() => {
          setShowList(!showList);
        }}
      />
      {showList && <View style={styles.list}>{mapData()}</View>}
    </ScrollView>
  );
}

interface ITimeZone {
  value: string;
  abbr: string;
  offset: number;
  isdst: boolean;
  text: string;
  utc: string[];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    flexDirection: "column",
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  clock: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  list: {
    justifyContent: "center",
    flexDirection: "column",
    gap: 10,
  },
  timeZone: {
    height: 50,

    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",

    backgroundColor: "blue",
  },
  timeZoneText: {
    color: "white",
    fontSize: 20,
  },
});
