import { StyleSheet, Text, View } from "react-native";

export default function TopDropDownMenu() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cacau Dourado</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#7B3F00",
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});