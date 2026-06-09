import React from 'react';
import { StyleSheet, View, Image, Pressable, Alert } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useCart } from '../contexts/CartContext';
import UsuarioService from '../services/UsuarioService';

import { obterImagem } from '../utils/imageMapper';

// Este é o cartão de produto compacto para a vitrine da Home
export default function RecommendationCard({ produto }) {
  const router = useRouter();
  const { adicionarAoCarrinho } = useCart();

  const imagemCapa = produto.imagensArray && produto.imagensArray.length > 0 ? produto.imagensArray[0] : null;
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
    <Card style={styles.card}>
      <Pressable onPress={handleCardPress}>
        <Image
          source={obterImagem(imagemCapa)}
          style={styles.cardImage}
          resizeMode="cover"
        />
      </Pressable>
      <View style={styles.contentContainer}>
        <Text style={styles.cardTitle} variant="labelLarge" numberOfLines={2}>
          {produto.nome}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.cardPrice} variant="bodyMedium">
            R$ {produto.preco}
          </Text>
          <IconButton
            icon="plus-circle"
            iconColor="#4B2412"
            size={30}
            style={styles.addButton}
            onPress={handleAdicionarAoCarrinho}
          />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 200,
    marginRight: 16,
    backgroundColor: '#FFF',
    marginBottom: 16
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 8
  },
  contentContainer: {
    flexGrow: 1, 
    padding: 8,
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: '#4B2412',
    textAlign: 'left',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardPrice: {
    color: '#000',
    fontWeight: 'bold',
  },
  addButton: {
    margin: 0,
    padding: 0,
  }
});
