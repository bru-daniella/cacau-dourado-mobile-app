import React from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";

export default function CartItemCard({ produto }) {
  return (
    <Card style={styles.cartaoProduto}>
      <Card.Title title={produto.nome} subtitle={`R$ ${produto.preco}`} />
    </Card>
  );
}

const styles = StyleSheet.create({
  cartaoProduto: {
    marginBottom: 8, 
  }
});
