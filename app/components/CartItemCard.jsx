import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, IconButton } from "react-native-paper";

export default function CartItemCard({ produto, onRemove }) {
  return (
    <Card style={styles.cartaoProduto}>
      <View style={styles.cardContainer}>
        {/* Informações do Produto */}
        <View style={styles.infoContainer}>
          <Text variant="titleMedium">{produto.nome}</Text>
          <Text variant="bodyMedium" style={styles.textoPreco}>
            R$ {produto.preco}
          </Text>
          {/* Mostra a quantidade de itens */}
          <Text variant="bodySmall" style={styles.textoQuantidade}>
            Quantidade: {produto.quantidade}
          </Text>
        </View>

        {/* Botão de Remover */}
        <IconButton
          icon="trash-can-outline"
          iconColor="#d32f2f"
          size={24}
          onPress={onRemove}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cartaoProduto: {
    marginBottom: 8, 
    backgroundColor: '#FFF',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  infoContainer: {
    flex: 1,
  },
  textoPreco: {
    color: '#4B2412',
    fontWeight: 'bold',
    marginVertical: 4,
  },
  textoQuantidade: {
    color: 'gray',
  }
});
