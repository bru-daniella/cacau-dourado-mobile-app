import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Card, Text } from "react-native-paper";
import { obterImagem } from "../utils/imageMapper";

export default function CartItemCard({ produto }) {
  // Pega a primeira imagem do array, se existir
  const imagemCapa = produto.imagensArray && produto.imagensArray.length > 0 ? produto.imagensArray[0] : null;

  return (
    <Card style={styles.cartaoProduto}>
      <View style={styles.conteudoCartao}>
        <Image 
          source={obterImagem(imagemCapa)} 
          style={styles.imagemProduto}
          resizeMode="cover"
        />
        <View style={styles.infoProduto}>
          <Text variant="titleMedium" style={styles.nomeProduto}>{produto.nome}</Text>
          <Text variant="bodyMedium" style={styles.precoProduto}>R$ {produto.preco}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cartaoProduto: {
    marginBottom: 8, 
    backgroundColor: '#FFF',
  },
  conteudoCartao: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  imagemProduto: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  infoProduto: {
    flex: 1,
    justifyContent: 'center',
  },
  nomeProduto: {
    color: '#4B2412',
    fontWeight: 'bold',
  },
  precoProduto: {
    color: '#000',
    marginTop: 4,
  }
});