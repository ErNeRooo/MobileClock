import { useEffect, useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
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
    utcOffset: 0,
  });
  const [filterText, setFilterText] = useState("");

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

  const onPressHandler = (name: string, offset: number) => {
    setCurrentTimeZone(() => {
      return {
        name: name,
        utcOffset: offset,
      };
    });
  };

  const mapData = (filterText: string = "") => {
    let data = Data.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    if (filterText != "") {
      data = data.filter((item) => {
        return item.name.includes(filterText);
      });
    }

    let answer = data.map(({ name, offset }, index) => (
      <TouchableOpacity
        style={styles.timeZone}
        onPress={() => {
          onPressHandler(name, offset);
        }}
      >
        <View key={index}>
          <Text style={styles.timeZoneText}>{name},</Text>
          <Text style={styles.timeZoneText}>offset: {offset}</Text>
        </View>
      </TouchableOpacity>
    ));

    return answer;
  };

  const translateDateByUtcOffset = (date: Date, offset: number) => {
    let offsetMinutes = offset * 60;

    const translatedDate = new Date(
      date.getTime() + (offsetMinutes + date.getTimezoneOffset()) * 60000
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

  const listOfTimeZones = useMemo(() => mapData(filterText), [filterText]);
  const onChangeHandler = (text: string) => {
    setFilterText(text);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.clock}>{currentTimeZone.name}</Text>
      <Text style={styles.clock}>{dateString}</Text>
      <Text style={styles.clock}>{hourString}</Text>

      <TextInput
        style={styles.search}
        onChangeText={(text) => onChangeHandler(text)}
        maxLength={40}
        cursorColor={"#2563eb"}
        placeholder="Search for a timezone"
        placeholderTextColor={"#737373"}
      ></TextInput>

      <View style={styles.list}>{listOfTimeZones}</View>
    </ScrollView>
  );
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
    height: "auto",

    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#2563eb",
    padding: 10,

    alignItems: "flex-start",
    flexDirection: "row",

    backgroundColor: "transparent",
  },
  timeZoneText: {
    color: "white",
    fontSize: 20,
  },
  search: {
    height: 50,

    color: "white",
    fontSize: 20,
    backgroundColor: "transparent",
    borderRadius: 20,
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "white",
    paddingHorizontal: 10,

    marginBottom: 10,
  },
});
