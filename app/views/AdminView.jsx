import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Card, useTheme, Divider } from "react-native-paper";
import UsuarioService from "../services/UsuarioService";

export default function AdminView() {
  const theme = useTheme();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const carregarUsuarios = async () => {
      const listaUsuarios = await UsuarioService.findAll();
      setUsuarios(listaUsuarios);
    };
    
    carregarUsuarios();
  }, []);

  const renderUsuario = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium">{item.nome}</Text>
        <Text variant="bodyMedium">E-mail: {item.email}</Text>
        <Text variant="bodySmall" style={{ color: "gray" }}>ID: {item.id}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={styles.titulo}>Painel Admin</Text>
      <Text variant="titleMedium" style={styles.subTitulo}>Usuários Cadastrados ({usuarios.length})</Text>
      
      <Divider style={styles.divider} />

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUsuario}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titulo: {
    textAlign: "center",
    marginVertical: 8,
    color: "#4B2412",
    fontWeight: "bold",
  },
  subTitulo: {
    marginBottom: 16,
    color: "#4B2412",
  },
  divider: {
    marginBottom: 16,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 8,
    backgroundColor: "#FFF"
  }
});
