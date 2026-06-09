import React from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { Text, Button, useTheme, Divider } from "react-native-paper";
import { useRouter } from "expo-router";
import CartItemCard from "../components/CartItemCard";
import { useCart } from "../contexts/CartContext";

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function CarrinhoView() {
  const theme = useTheme();
  const router = useRouter();

  const {
    cartItems,
    adicionarAoCarrinho,
    diminuirQuantidade,
    removerDoCarrinho,
    limparCarrinho,
    quantidadeTotal,
    valorTotal,
  } = useCart();

  const finalizarPedido = () => {
    router.push("/views/CheckoutView");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={styles.titulo}>
        Seu Carrinho
      </Text>

      {cartItems.length === 0 ? (
        <View style={styles.carrinhoVazioContainer}>
          <Text variant="titleMedium" style={styles.textoVazio}>
            Seu carrinho está vazio.
          </Text>

          <Button
            mode="contained"
            buttonColor="#4B2412"
            style={styles.botaoAcao}
            onPress={() => router.push("/views/HomeView")}
          >
            Voltar às Compras
          </Button>
        </View>
      ) : (
        <View style={styles.conteudo}>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <CartItemCard
                produto={item}
                onAdicionar={adicionarAoCarrinho}
                onDiminuir={diminuirQuantidade}
                onRemover={removerDoCarrinho}
              />
            )}
            contentContainerStyle={styles.lista}
          />

          <View style={styles.resumoContainer}>
            <View style={styles.linhaResumo}>
              <Text style={styles.labelResumo}>Itens</Text>
              <Text style={styles.valorResumo}>{quantidadeTotal}</Text>
            </View>

            <Divider style={styles.divisor} />

            <View style={styles.linhaResumo}>
              <Text style={styles.labelTotal}>Total</Text>
              <Text style={styles.valorTotal}>{formatarMoeda(valorTotal)}</Text>
            </View>

            <Button
              mode="contained"
              buttonColor="#4B2412"
              style={styles.botaoAcao}
              labelStyle={styles.textoBotao}
              onPress={finalizarPedido}
            >
              Finalizar Pedido
            </Button>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  conteudo: {
    flex: 1,
  },
  titulo: {
    textAlign: "center",
    marginVertical: 16,
    color: "#4B2412",
    fontWeight: "bold",
  },
  lista: {
    paddingBottom: 12,
  },
  carrinhoVazioContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  textoVazio: {
    color: "#4B2412",
    fontWeight: "bold",
  },
  resumoContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    elevation: 3,
  },
  linhaResumo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  labelResumo: {
    fontSize: 16,
    color: "#4B2412",
  },
  valorResumo: {
    fontSize: 16,
    fontWeight: "bold",
  },
  divisor: {
    marginVertical: 10,
  },
  labelTotal: {
    fontSize: 20,
    color: "#4B2412",
    fontWeight: "bold",
  },
  valorTotal: {
    fontSize: 20,
    color: "#4B2412",
    fontWeight: "bold",
  },
  botaoAcao: {
    marginTop: 16,
    paddingVertical: 8,
    borderRadius: 18,
  },
  textoBotao: {
    fontSize: 16,
    fontWeight: "bold",
  },
});