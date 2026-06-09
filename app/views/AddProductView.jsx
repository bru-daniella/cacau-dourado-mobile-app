import React from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import AddProductForm from '../components/AddProductForm';
import ProdutosService from '../services/ProdutosService';

// Esta é a página dedicada para adicionar um novo produto.
export default function AddProductView() {
  const theme = useTheme();
  const router = useRouter();

  // Função que será chamada pelo formulário quando o usuário clicar em "Salvar"
  const handleAddProduct = async (novoProduto) => {
    try {
      await ProdutosService.save(novoProduto);
      Alert.alert(
        "Sucesso", 
        "Novo produto adicionado! Você será redirecionado para o Painel Admin.",
        [{ text: "OK", onPress: () => router.back() }] // Volta para a tela anterior (AdminView)
      );
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o produto.");
      console.error("Erro ao salvar produto:", error);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.formContainer}>
        <AddProductForm 
          onSubmit={handleAddProduct}
          onCancel={() => router.back()} // O botão "Cancelar" agora simplesmente volta
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});
