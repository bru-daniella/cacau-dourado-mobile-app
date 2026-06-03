import React from 'react';
import { StyleSheet, View, Image, Pressable, Alert } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useCart } from '../contexts/CartContext';
import UsuarioService from '../services/UsuarioService';

// Dicionário de imagens locais para mapear os nomes do banco de dados
const dicionarioDeImagens = {
  "brigadeiro-1": require("../../assets/images/products/brigadeiro-1.jpg"),
  "brigadeiro-2": require("../../assets/images/products/brigadeiro-2.jpg"),
  "brigadeiro-3": require("../../assets/images/products/brigadeiro-3.webp"),
  "brigadeiro-4": require("../../assets/images/products/brigadeiro-4.jpg"),
  "beijinho-1": require("../../assets/images/products/beijinho-1.jpg"),
  "beijinho-2": require("../../assets/images/products/beijinho-2.jpg"),
  "beijinho-3": require("../../assets/images/products/beijinho-3.jpg"),
  "brownie-1": require("../../assets/images/products/brownie-1.jpg"),
  "brownie-2": require("../../assets/images/products/brownie-2.jpg"),
  "brownie-3": require("../../assets/images/products/brownie-3.jpg"),
  "brownie-4": require("../../assets/images/products/brownie-4.jpg"),
};

// Função para obter a imagem correta (local ou da web)
const obterImagem = (nomeOuUrl) => {
  if (dicionarioDeImagens[nomeOuUrl]) {
    return dicionarioDeImagens[nomeOuUrl];
  }
  if (typeof nomeOuUrl === "string" && nomeOuUrl.startsWith("http")) {
    return { uri: nomeOuUrl };
  }
  return { uri: 'https://via.placeholder.com/150?text=Sem+Imagem' };
};


// Este é o cartão de produto compacto para a vitrine da Home
export default function RecommendationCard({ produto }) {
  const router = useRouter();
  const { adicionarAoCarrinho } = useCart();

  // Pega a primeira imagem do array para usar como capa
  const imagemCapa = produto.imagensArray.length > 0 ? produto.imagensArray[0] : null;

  // Navega para a lista de doces da categoria do produto clicado
  const handleCardPress = () => {
    router.push(`/views/DocesListView?categoria=${produto.categoria}`);
  };

  const handleAdicionarAoCarrinho = () => {
    const usuarioAtual = UsuarioService.getUsuarioLogado();
    if (!usuarioAtual) {
      Alert.alert(
        "Login Necessário",
        "Você precisa estar logado para adicionar produtos à cesta.",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Ir para Login", onPress: () => router.push('/views/LoginView') }
        ]
      );
      return;
    }
    adicionarAoCarrinho(produto);
    Alert.alert("Sucesso", `${produto.nome} foi adicionado à sua cesta!`);
  };

  return (
    <View>
      <Pressable onPress={handleCardPress}>
        <Card style={styles.card}>
          <Image
            source={obterImagem(imagemCapa)}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle} variant="labelLarge" numberOfLines={2}>{produto.nome}</Text>
            <Text style={styles.cardPrice} variant="labelLarge">R$ {produto.preco}</Text>
          </View>
        </Card>
      </Pressable>
      {/* Botão de Adicionar (+) posicionado sobre o card */}
      <IconButton
        icon="plus-circle"
        iconColor="#4B2412"
        size={32}
        style={styles.addButton}
        onPress={handleAdicionarAoCarrinho}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    height: 200, // Aumenta a altura para caber o preço
    marginRight: 16,
    backgroundColor: '#FFF',
    overflow: 'hidden',
    position: 'relative', // Necessário para o posicionamento absoluto do botão
  },
  cardImage: {
    width: '100%',
    height: 110,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'flex-start', // Alinha o conteúdo ao topo
    alignItems: 'center',
    paddingTop: 8,
    paddingHorizontal: 4,
  },
  cardTitle: {
    textAlign: 'center',
    color: '#4B2412',
    minHeight: 32, // Garante espaço para duas linhas de texto
  },
  cardPrice: {
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
    marginTop: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: -5,
    right: 5,
    borderRadius: 20,
  }
});
