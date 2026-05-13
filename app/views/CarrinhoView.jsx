import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Button, Card, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";

export default function CarrinhoView() {
  const theme = useTheme();
  const router = useRouter();
  
  // Estado local para simular o carrinho
  const [itensCarrinho, setItensCarrinho] = useState([]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={styles.titulo}>Seu Carrinho</Text>

      {itensCarrinho.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text variant="bodyLarge">Seu carrinho está vazio.</Text>
          <Button 
            mode="contained" 
            buttonColor="#4B2412" 
            style={styles.btnVoltar}
            onPress={() => router.push('/views/HomeView')}
          >
            Voltar às Compras
          </Button>
        </View>
      ) : (
        <FlatList
          data={itensCarrinho}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Title title={item.nome} subtitle={`R$ ${item.preco}`} />
            </Card>
          )}
        />
      )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  btnVoltar: {
    marginTop: 16,
  },
  card: {
    marginBottom: 8,
  }
});