import { Banner, Button } from "@react-native-material/core";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native-paper";

import { Image, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import ProductCardSmall from "../components/ProductCardSmall";
import UsuarioService from "../services/UsuarioService";
export default function HomeView() {
  const theme = useTheme();
  const router = useRouter();

  // Tenta criar o admin assim que a HomeView for carregada pela primeira vez.
  // Isso resolve o problema caso o admin não seja criado ao abrir a tela de Login
  useEffect(() => {
    UsuarioService.initAdminUser();
  }, []);

  // Guarda a lista de doces que vai aparecer na tela
  const [doces, setDoces] = useState([]);
  const produto = { imagensArray: [] };
  return (
    <View style={[style.container]}>
      <View style={style.conteudo}>
        <Banner
          style={style.banner}
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
        />
        <View style={style.divisaosubtBtn}>
          <Text style={style.subtitulo} variant="titleSmall">
            Para você
          </Text>
          <Button
            style={style.button}
            variant="text"
            title="Ver tudo"
            color="#77574D"
            uppercase={false}
            compact
            onPress={() => router.push("/views/DocesListView")}
          />
        </View>
      </View>

      <View style={style.cardView}>
        <ProductCardSmall
          style={style.card}
          produto={{
            imagensArray: [
              "https://i.panelinha.com.br/i1/64-bk-7265-cocada.webp",
            ],
            nome: "Hello",
            preco: "100,00",
          }}
        ></ProductCardSmall>
        <ProductCardSmall
          style={style.card}
          produto={{
            imagensArray: [
              "https://i.panelinha.com.br/i1/64-bk-7265-cocada.webp",
            ],
            nome: "Hello",
            preco: "100,00",
          }}
        ></ProductCardSmall>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  subtitulo: {
    fontFamily: "Georgia",
    fontWeight: "bold",
    padding: 15,
    fontSize: 20,
    color: "#3e2723",
    display: "flex",
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff8f6",
  },
  conteudo: {
    flex: 1,
    backgroundColor: "#fff8f6",
    gap: 10,
  },
  banner: {
    backgroundColor: "#fff8f6",
  },
  button: {
    textDecorationLine: "underline",
    margin: 10,
  },
  text: {
    fontSize: 40,
    justifyContent: "center",
    textAlign: "center",
    color: "#FFFF",
  },
  cardView: {
    flexDirection: "row",
  },
  divisaosubtBtn: {
    flexDirection: "row",
  },
  card: {
    flex: 1,
    maxWidth: 1,
  },
});
