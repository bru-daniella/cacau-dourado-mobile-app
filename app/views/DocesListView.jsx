import React, { useState, useCallback } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useLocalSearchParams, useFocusEffect, useRouter } from "expo-router"; // Importando useFocusEffect e useRouter
import ProdutosService from "../services/ProdutosService";
import ProductCard from "../components/ProductCard";
import { useCart } from "../contexts/CartContext";
import UsuarioService from "../services/UsuarioService";

// Esta tela mostra a lista de doces para o cliente comprar
export default function DocesListView() {
  // Pega a categoria selecionada (ex: "Brigadeiro") que vem da URL
  const { categoria } = useLocalSearchParams();
  const router = useRouter();
  
  // Guarda a lista de doces que vai aparecer na tela
  const [doces, setDoces] = useState([]);
  const theme = useTheme();
  
  const { adicionarAoCarrinho } = useCart();

  // useFocusEffect garante que os produtos sejam recarregados toda vez que a tela é aberta
  // Isso resolve problemas de cache onde a lista ficava presa em um filtro anterior
  useFocusEffect(
    useCallback(() => {
      const carregarProdutos = async () => {
        // 1. Busca todos os produtos do banco de dados
        const todosProdutos = await ProdutosService.findAll();
        
        // 2. Filtra os produtos: Se tiver uma categoria escolhida, mostra só os da categoria. 
        // Se não, mostra todos.
        const docesFiltrados = categoria 
          ? todosProdutos.filter(produto => produto.categoria === categoria) 
          : todosProdutos;
          
        // 3. Salva os produtos filtrados para mostrar na tela
        setDoces(docesFiltrados);
      };
      
      carregarProdutos();
    }, [categoria]) // O efeito será re-executado se a categoria mudar
  );

  // Função chamada quando o usuário clica no botão "Adicionar ao Carrinho"
  const handleAdicionarAoCarrinho = (produtoSelecionado) => {
    const usuarioAtual = UsuarioService.getUsuarioLogado();
    if (!usuarioAtual) {
      Alert.alert(
        "Login Necessário",
        "Você precisa estar logado para adicionar produtos ao carrinho.",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Ir para Login", onPress: () => router.push('/views/LoginView') }
        ]
      );
      return;
    }
    adicionarAoCarrinho(produtoSelecionado);
    Alert.alert("Sucesso", `${produtoSelecionado.nome} foi adicionado ao carrinho!`);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Título da página */}
      <Text variant="headlineMedium" style={styles.titulo}>
        {categoria ? `Nossos ${categoria}s` : 'Nossos Doces'}
      </Text>

      {/* Lista que repete o cartão para cada doce encontrado */}
      <FlatList
        data={doces}
        keyExtractor={(produto) => produto.id.toString()}
        renderItem={({ item }) => (
          <ProductCard produto={item} onAddToCart={handleAdicionarAoCarrinho} />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

// Estilos visuais da tela (cores, margens, tamanhos)
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
  }
});