import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Card, Text, IconButton } from "react-native-paper";
import { obterImagem } from "../utils/imageMapper";

function converterPrecoParaNumero(preco) {
  if (typeof preco === "number") {
    return preco;
  }

  if (!preco) {
    return 0;
  }

  return Number(String(preco).replace("R$", "").replace(".", "").replace(",", ".").trim()) || 0;
}

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function obterImagemCapa(produto) {
  if (produto.imagensArray && produto.imagensArray.length > 0) {
    return produto.imagensArray[0];
  }

  if (Array.isArray(produto.imagens) && produto.imagens.length > 0) {
    return produto.imagens[0];
  }

  if (typeof produto.imagens === "string") {
    try {
      const imagensConvertidas = JSON.parse(produto.imagens);

      if (Array.isArray(imagensConvertidas) && imagensConvertidas.length > 0) {
        return imagensConvertidas[0];
      }
    } catch (error) {
      return produto.imagens;
    }
  }

  if (Array.isArray(produto.imagem) && produto.imagem.length > 0) {
    return produto.imagem[0];
  }

  if (typeof produto.imagem === "string") {
    try {
      const imagensConvertidas = JSON.parse(produto.imagem);

      if (Array.isArray(imagensConvertidas) && imagensConvertidas.length > 0) {
        return imagensConvertidas[0];
      }
    } catch (error) {
      return produto.imagem;
    }
  }

  return null;
}

export default function CartItemCard({
                                       produto,
                                       onAdicionar,
                                       onDiminuir,
                                       onRemover,
                                     }) {
  const imagemCapa = obterImagemCapa(produto);
  const precoUnitario = converterPrecoParaNumero(produto.preco);
  const subtotal = precoUnitario * produto.quantidade;

  return (
      <Card style={styles.cartaoProduto}>
        <View style={styles.conteudoCartao}>
          <Image
              source={obterImagem(imagemCapa)}
              style={styles.imagemProduto}
              resizeMode="cover"
          />

          <View style={styles.infoProduto}>
            <Text variant="titleMedium" style={styles.nomeProduto}>
              {produto.nome}
            </Text>

            <Text variant="bodyMedium" style={styles.precoProduto}>
              {formatarMoeda(precoUnitario)}
            </Text>

            <Text variant="bodySmall" style={styles.subtotal}>
              Subtotal: {formatarMoeda(subtotal)}
            </Text>

            <View style={styles.quantidadeContainer}>
              <IconButton
                  icon="minus"
                  size={18}
                  mode="contained-tonal"
                  onPress={() => onDiminuir(produto.id)}
              />

              <Text style={styles.quantidade}>{produto.quantidade}</Text>

              <IconButton
                  icon="plus"
                  size={18}
                  mode="contained-tonal"
                  onPress={() => onAdicionar(produto)}
              />

              <IconButton
                  icon="trash-can-outline"
                  size={20}
                  iconColor="#A00000"
                  onPress={() => onRemover(produto.id)}
              />
            </View>
          </View>
        </View>
      </Card>
  );
}

const styles = StyleSheet.create({
  cartaoProduto: {
    marginBottom: 12,
    backgroundColor: "#FFF",
    borderRadius: 14,
  },
  conteudoCartao: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
  },
  imagemProduto: {
    width: 74,
    height: 74,
    borderRadius: 10,
    marginRight: 14,
    backgroundColor: "#F2E3C6",
  },
  infoProduto: {
    flex: 1,
    justifyContent: "center",
  },
  nomeProduto: {
    color: "#4B2412",
    fontWeight: "bold",
  },
  precoProduto: {
    color: "#000",
    marginTop: 4,
  },
  subtotal: {
    color: "#4B2412",
    marginTop: 4,
    fontWeight: "bold",
  },
  quantidadeContainer: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  quantidade: {
    fontSize: 18,
    fontWeight: "bold",
    minWidth: 28,
    textAlign: "center",
  },
});