import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  Button,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Data from "./assets/timezones.json";

export default function App() {
  const [dateString, setDateString] = useState("");
  const [hourString, setHourString] = useState("");
  const [currentTimeZone, setCurrentTimeZone] = useState({
    name: "UTC",
    description: "Coordinated Universal Time",
    utcOffset: 0,
  });

  useEffect(() => {
    updateDate(translateDateByUtcOffset(new Date(), currentTimeZone.utcOffset));

    const interval = setInterval(() => {
      let date = translateDateByUtcOffset(
        new Date(),
        currentTimeZone.utcOffset
      );
      if (currentTimeZone.utcOffset != 0) {
        date = translateDateByUtcOffset(new Date(), currentTimeZone.utcOffset);
      }
      updateDate(date);
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTimeZone]);

  const onPressHandler = (
    name: string,
    description: string,
    offset: number
  ) => {
    setCurrentTimeZone(() => {
      return {
        name: name,
        description: description,
        utcOffset: offset,
      };
    });
  };

  const mapData = (filterText: string = "") => {
    let data = Data.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    console.log("morgen");

    if (filterText != "") {
      data = data.filter((item) => {
        return item.name.includes(filterText);
      });
    }

    let answer = data.map(({ name, description, offset }, index) => (
      <TouchableOpacity
        style={styles.timeZone}
        onPress={() => {
          onPressHandler(name, description, offset);
        }}
      >
        <Text style={styles.timeZoneText} key={index}>
          {name}, {description}, offset: {offset / 60}
        </Text>
      </TouchableOpacity>
    ));

    return answer;
  };

  const translateDateByUtcOffset = (date: Date, offset: number) => {
    const translatedDate = new Date(
      date.getTime() + (offset + date.getTimezoneOffset()) * 60000
    );

    return translatedDate;
  };

  const updateDate = (date: Date) => {
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

  const onChangeHandler = (text: string) => {
    mapData(text);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.clock}>{currentTimeZone.name}</Text>
      <Text style={styles.clock}>{currentTimeZone.description}</Text>
      <Text style={styles.clock}>{dateString}</Text>
      <Text style={styles.clock}>{hourString}</Text>

      <TextInput
        style={styles.search}
        onChangeText={(text) => onChangeHandler(text)}
      ></TextInput>

      <View style={styles.list}>{mapData()}</View>
    </ScrollView>
  );
}

interface ITimeZone {
  name: string;
  description: string;
  offset: number;
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
  search: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
