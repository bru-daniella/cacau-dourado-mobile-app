import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Image, Alert } from "react-native";
import { Text, Card, Button, useTheme } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import ProdutosService from "../services/ProdutosService";

export default function DocesListView() {
  const { categoria } = useLocalSearchParams();
  const [doces, setDoces] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    // Simulando a busca de produtos com base na categoria 
    // Como ProdutosService.js foi feito para contatos, 
    // estamos adaptando e pegando as propriedades do mock atual
    const carregarProdutos = async () => {
      const produtos = await ProdutosService.findAll();
      // Se não houver, vamos usar o array mockado (neste projeto ele está comentado ou inicializa vazio, 
      // mas vamos adicionar itens padrões caso seja vazio)
      if (produtos.length === 0) {
          const mockDoces = [
              { id: '1', nome: 'Brigadeiro Tradicional', preco: '5,99', categoria: 'Brigadeiro', imagem: 'https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971556_1280.jpg' },
              { id: '2', nome: 'Brigadeiro Gourmet', preco: '7,99', categoria: 'Brigadeiro', imagem: 'https://cdn.pixabay.com/photo/2016/09/06/16/04/brigadeiro-1649377_1280.jpg' },
              { id: '3', nome: 'Beijinho de Coco', preco: '5,99', categoria: 'Beijinho', imagem: 'https://cdn.pixabay.com/photo/2019/12/21/20/19/coconut-candy-4711239_1280.jpg' },
              { id: '4', nome: 'Brownie de Chocolate', preco: '9,99', categoria: 'Brownie', imagem: 'https://cdn.pixabay.com/photo/2014/11/28/08/03/brownie-548591_1280.jpg' },
              { id: '5', nome: 'Brownie com Sorvete', preco: '14,99', categoria: 'Brownie', imagem: 'https://cdn.pixabay.com/photo/2017/02/15/10/39/brownies-2068212_1280.jpg' },
          ];
          const docesFiltrados = categoria ? mockDoces.filter(d => d.categoria === categoria) : mockDoces;
          setDoces(docesFiltrados);
      } else {
         const docesFiltrados = categoria ? produtos.filter(d => d.nome.includes(categoria)) : produtos;
         setDoces(docesFiltrados);
      }
    };
    
    carregarProdutos();
  }, [categoria]);

  const adicionarAoCarrinho = (item) => {
      Alert.alert("Sucesso", `${item.nome} foi adicionado ao carrinho!`);
      // Aqui você poderia atualizar o estado de um contexto global (Ex: CartContext)
  };

  const renderDoce = ({ item }) => (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.imagem || 'https://via.placeholder.com/150' }} />
      <Card.Content style={styles.cardContent}>
        <Text variant="titleLarge">{item.nome}</Text>
        <Text variant="bodyMedium" style={{color: '#4B2412', fontWeight: 'bold'}}>R$ {item.preco}</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" buttonColor="#4B2412" onPress={() => adicionarAoCarrinho(item)}>
          Adicionar ao Carrinho
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={styles.titulo}>
        {categoria ? `Nossos ${categoria}s` : 'Nossos Doces'}
      </Text>
      <FlatList
        data={doces}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderDoce}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

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
  }
});