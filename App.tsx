import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, Button } from "react-native";

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

    let hours: string = date.getHours().toString();
    let minutes: string = date.getMinutes().toString();
    let seconds: string = date.getSeconds().toString();

    let year: string = date.getFullYear().toString();
    let month: string = (date.getMonth() + 1).toString();
    let day: string = date.getDate().toString();

    setDateString(`${year}-${month}-${day}`);
    setHourString(`${hours}:${minutes}:${seconds}`);
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
        <>
          <Text style={styles.timeZone}>Something</Text>
          <Text style={styles.timeZone}>Something</Text>
          <Text style={styles.timeZone}>Something</Text>
          <Text style={styles.timeZone}>Something</Text>
        </>
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
    width: "90%",

    backgroundColor: "#blue",
  },
});
