import React from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import CartItemCard from "../components/CartItemCard";
import { useCart } from "../contexts/CartContext"; // Importa o hook do carrinho

// Esta tela mostra os itens que o cliente quer comprar e permite finalizar o pedido
export default function CarrinhoView() {
  const theme = useTheme();
  const router = useRouter(); // Ferramenta para navegar entre as telas
  
  // Pega os itens e a função de remover do nosso Contexto Global
  const { itens, removerDoCarrinho } = useCart();

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
      {itens.length === 0 ? (
        
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
            data={itens}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item: produto }) => (
              <CartItemCard 
                produto={produto} 
                onRemove={() => removerDoCarrinho(produto.id)} 
              />
            )}
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
