import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { Banner, Button, HStack } from "@react-native-material/core";
import { useRouter } from "expo-router";

export default function HomeView() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <View
      style={[style.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={style.conteudo}>
        <Banner
          text="Conheça as melhores barras recheadas!"
          illustration={
            <Image
              source={require("../../assets/images/banner1.jpg")}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          }
          illustrationContainerStyle={{
            width: "100%",
            height: 150,
            overflow: "hidden",
            borderRadius: 8,
          }}
          textContainerStyle={{
            position: "absolute",
            bottom: 20,
            left: 10,
            right: 80,
            color: "#FFFFFF",
            backgroundColor: "#1d00001f",
            padding: 20,
            borderRadius: 6,
          }}
          textStyle={{
            color: "rgb(255 207 91)",
            fontSize: 25,
            textAlign: "left",
            fontFamily: "Georgia",
            textShadowColor: "#000",
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 3,
          }}
          buttons={
            <HStack spacing={4}>
              <Button 
                variant="contained" 
                color="#4B2412"
                title="Ver Produtos" 
                compact 
                onPress={() => router.push('/views/DocesListView')}
              />
            </HStack>
          }
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  conteudo: {
    flex: 1,
    gap: 10,
  },
  text: {
    fontSize: 40,
    justifyContent: "center",
    textAlign: "center",
    color: "#FFFF",
  },
});
