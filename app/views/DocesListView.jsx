import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { Text, Card, Button, useTheme } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import ProdutosService from "../services/ProdutosService";

export default function DocesListView() {
  const { categoria } = useLocalSearchParams();
  const [doces, setDoces] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const carregarProdutos = async () => {
      const produtos = await ProdutosService.findAll();
      
      const docesFiltrados = categoria ? produtos.filter(d => d.categoria === categoria) : produtos;
      setDoces(docesFiltrados);
    };
    
    carregarProdutos();
  }, [categoria]);

  const adicionarAoCarrinho = (item) => {
      Alert.alert("Sucesso", `${item.nome} foi adicionado ao carrinho!`);
  };

  const renderDoce = ({ item }) => (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.imagem || 'https://via.placeholder.com/150' }} />
      <Card.Content style={styles.cardContent}>
        <Text variant="titleLarge">{item.nome}</Text>
        <Text variant="bodyMedium" style={{color: '#4B2412', fontWeight: 'bold'}}>R$ {item.preco}</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" buttonColor="#4B2412" onPress={() => adicionarAoCarrinho(item)}>
          Adicionar ao Carrinho
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={styles.titulo}>
        {categoria ? `Nossos ${categoria}s` : 'Nossos Doces'}
      </Text>
      <FlatList
        data={doces}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderDoce}
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
    marginVertical: 16,
    color: "#4B2412",
    fontWeight: "bold",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 16,
    backgroundColor: "#FFF"
  },
  cardContent: {
    marginTop: 8,
    gap: 4
  }
});