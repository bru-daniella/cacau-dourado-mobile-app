import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { Text, Card, Button, useTheme } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import ProdutosService from "../services/ProdutosService";

// Esta tela mostra a lista de doces para o cliente comprar
export default function DocesListView() {
  // Pega a categoria selecionada (ex: "Brigadeiro") que vem da URL
  const { categoria } = useLocalSearchParams();
  
  // Guarda a lista de doces que vai aparecer na tela
  const [doces, setDoces] = useState([]);
  const theme = useTheme();

  // Executa assim que a tela abre ou quando a categoria muda
  useEffect(() => {
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
  }, [categoria]);

  // Função chamada quando o usuário clica no botão "Adicionar ao Carrinho"
  const adicionarAoCarrinho = (produtoSelecionado) => {
      Alert.alert("Sucesso", `${produtoSelecionado.nome} foi adicionado ao carrinho!`);
  };

  // Como cada doce deve aparecer na lista (Visual do Cartão do Doce)
  const renderDoce = ({ item: produto }) => (
    <Card style={styles.card}>
      {/* Imagem do produto */}
      <Card.Cover source={{ uri: produto.imagem || 'https://via.placeholder.com/150' }} />
      
      {/* Informações do produto */}
      <Card.Content style={styles.cardContent}>
        <Text variant="titleLarge">{produto.nome}</Text>
        <Text variant="bodyMedium" style={styles.textoPreco}>R$ {produto.preco}</Text>
      </Card.Content>
      
      {/* Botões do produto */}
      <Card.Actions>
        <Button mode="contained" buttonColor="#4B2412" onPress={() => adicionarAoCarrinho(produto)}>
          Adicionar ao Carrinho
        </Button>
      </Card.Actions>
    </Card>
  );

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
        renderItem={renderDoce}
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
  },
  card: {
    marginBottom: 16,
    backgroundColor: "#FFF"
  },
  cardContent: {
    marginTop: 8,
    gap: 4
  },
  textoPreco: {
    color: '#4B2412', 
    fontWeight: 'bold'
  }
});
