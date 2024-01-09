import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, Button, View } from "react-native";

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

  const updateDate = () => {
    let date = new Date();

    let hours: number = date.getHours();
    let minutes: number = date.getMinutes();
    let seconds: number = date.getSeconds();

    let year: number = date.getFullYear();
    let month: number = date.getMonth() + 1;
    let day: number = date.getDate();

    let stringHours: string = hours.toString();
    let stringMinutes: string = minutes.toString();
    let stringSeconds: string = seconds.toString();

    let stringYear: string = year.toString();
    let stringMonth: string =
      month < 9 ? "0" + month.toString() : month.toString();
    let stringDay: string = day < 9 ? "0" + day.toString() : day.toString();

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
      {showList && (
        <View style={styles.list}>
          <View style={styles.timeZone}>
            <Text>Something</Text>
          </View>
          <View style={styles.timeZone}>
            <Text>Something</Text>
          </View>
          <View style={styles.timeZone}>
            <Text>Something</Text>
          </View>
          <View style={styles.timeZone}>
            <Text>Something</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  clock: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  list: {
    justifyContent: "center",
    flexDirection: "column",
    gap: 10,
  },
  timeZone: {
    height: 50,

    backgroundColor: "blue",
  },
});
