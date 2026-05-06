import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import TopDropDownMenu from "./components/TopDropDownMenu";

const tema = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#b2c3d8",
    secondary: "#021123",
    background: "#e2e6eb",
    surface: "#7babe7",
    onPrimary: "#FFFFFF",
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={tema}>
      <View style={styles.container}>
        <TopDropDownMenu />

        <View style={styles.content}>
          <Slot />
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});