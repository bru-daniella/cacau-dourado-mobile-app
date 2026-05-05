<<<<<<< HEAD
import { Redirect } from 'expo-router';
import { StyleSheet } from "react-native";
=======

import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
>>>>>>> 9c9904db882a38b5b462a61c856d767dd1d902c7
import { useTheme } from "react-native-paper";
import { Redirect } from 'expo-router';

export default function Index() {
  const theme = useTheme();
  
  // Aqui estamos forçando o redirecionamento inicial para a tela de login.
  // Em uma aplicação real, você verificaria se o usuário já tem uma sessão
  // armazenada (ex: um token no AsyncStorage) antes de redirecionar.
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