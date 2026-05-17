import { Redirect } from 'expo-router';
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useEffect } from "react";
import UsuarioService from "./services/UsuarioService";

export default function Index() {
  const theme = useTheme();
  
  // Tenta criar o admin logo no ponto de entrada do app, antes de qualquer redirecionamento
  useEffect(() => {
    const inicializar = async () => {
      await UsuarioService.initAdminUser();
    };
    inicializar();
  }, []);

  return <Redirect href="/views/LoginView" />;
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  conteudo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  text:{
    fontSize:40,
    backgroundColor: "#FFFF"
  }
});
