import React from "react";
import { View, StyleSheet, Image, ScrollView, Dimensions } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import { obterImagem } from "../utils/imageMapper";

const { width } = Dimensions.get("window");

export default function ProductCard({ produto, onAddToCart }) {
  return (
    <Card style={styles.card}>
      {/* Componente de Scroll Lateral para Imagens */}
      <View style={styles.carrosselContainer}>
        <ScrollView
          horizontal // Faz rolar de lado
          showsHorizontalScrollIndicator={false} // Esconde a barrinha de rolagem
          pagingEnabled // Faz as imagens pararem "coladas" como páginas
        >
          {/* Percorre o array de imagens que configuramos na Entidade */}
          {produto.imagensArray.map((nomeOuUrl, index) => (
            <Image
              key={index}
              source={obterImagem(nomeOuUrl)} // 3. USA A FUNÇÃO AQUI!
              style={styles.imagemCarrossel}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
        {/* Mostra um pequeno aviso se tiver mais de uma imagem */}
        {produto.imagensArray.length > 1 && (
          <View style={styles.indicadorScroll}>
            <Text style={styles.textoIndicador}>Arraste para o lado ➡️</Text>
          </View>
        )}
      </View>

      {/* Informações do produto */}
      <Card.Content style={styles.cardContent}>
        <Text variant="titleLarge">{produto.nome}</Text>
        <Text variant="bodyMedium" style={styles.textoPreco}>
          R$ {produto.preco}
        </Text>
      </Card.Content>

      {/* Botões do produto */}
      <Card.Actions>
        <Button
          mode="contained"
          buttonColor="#4B2412"
          onPress={() => onAddToCart(produto)}
        >
          Adicionar ao Carrinho
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    backgroundColor: "#FFF",
    overflow: "hidden", // Garante que a imagem não vaze dos cantos redondos do cartão
  },
  carrosselContainer: {
    height: 200, // Altura fixa para a imagem
    width: "100%",
  },
  imagemCarrossel: {
    width: width - 32, // Largura da tela menos os paddings laterais (16 de cada lado)
    height: 200,
  },
  indicadorScroll: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  textoIndicador: {
    color: "#FFF",
    fontSize: 10,
  },
  cardContent: {
    marginTop: 8,
    gap: 4,
  },
  textoPreco: {
    color: "#4B2412",
    fontWeight: "bold",
  },
});
