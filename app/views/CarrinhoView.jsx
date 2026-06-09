import React from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import CartItemCard from "../components/CartItemCard";
import { useCart } from "../contexts/CartContext";

// Esta tela mostra os itens que o cliente quer comprar e permite finalizar o pedido
export default function CarrinhoView() {
  const theme = useTheme();
  const router = useRouter(); // Ferramenta para navegar entre as telas
  
  // Lista de itens no carrinho
  const { cartItems } = useCart();

  // O que acontece quando o cliente clica em "Finalizar Pedido"
  const finalizarPedido = () => {
    Alert.alert(
      "Pedido Confirmado",
      "Seu pedido foi finalizado com sucesso! Redirecionando para a tela inicial...",
      [
        // Ao clicar em OK, o cliente volta para a tela inicial (Home)
        { text: "OK", onPress: () => router.push('/views/HomeView') }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Título da tela */}
      <Text variant="headlineMedium" style={styles.titulo}>Seu Carrinho</Text>

      {/* Verifica se o carrinho está vazio */}
      {cartItems.length === 0 ? (
        
        // --- VISUAL QUANDO O CARRINHO ESTÁ VAZIO ---
        <View style={styles.carrinhoVazioContainer}>
          <Text variant="bodyLarge">Sua cesta está vazia.</Text>
          <Button 
            mode="contained" 
            buttonColor="#4B2412" 
            style={styles.botaoAcao}
            onPress={() => router.push('/views/DocesListView')}
          >
            Ver Produtos
          </Button>
        </View>
        
      ) : (

        // --- VISUAL QUANDO TEM ITENS NO CARRINHO ---
        <View style={{ flex: 1 }}>
          {/* Lista os itens do carrinho um por um usando o componente de cartão */}
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item: produto }) => <CartItemCard produto={produto} />}
          />
          
          {/* Botão de finalizar compra */}
          <Button 
            mode="contained" 
            buttonColor="#4B2412" 
            style={styles.botaoAcao}
            onPress={finalizarPedido}
          >
            Finalizar Pedido
          </Button>
        </View>
        
      )}
    </View>
  );
}

// Estilos visuais da tela
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
  carrinhoVazioContainer: {
    flex: 1,
    justifyContent: "center", // Centraliza o texto e botão no meio da tela
    alignItems: "center",
    gap: 16,
  },
  botaoAcao: {
    marginTop: 16,
    paddingVertical: 8,
  }
});
