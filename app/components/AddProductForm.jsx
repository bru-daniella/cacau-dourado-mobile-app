import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import ProdutoEntity from '../entities/ProdutoEntity';

// Formulário para adicionar ou editar um produto
export default function AddProductForm({ onSubmit, onCancel }) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagens, setImagens] = useState(''); // Será uma string de URLs/nomes separados por vírgula
  const [categoria, setCategoria] = useState('');

  const handleSave = () => {
    // Validação simples para garantir que os campos essenciais foram preenchidos
    if (!nome || !preco || !categoria) {
      Alert.alert("Atenção", "Os campos Nome, Preço e Categoria são obrigatórios.");
      return;
    }

    // Transforma a string de imagens em um array JSON
    // Ex: "url1, url2, url3" -> ["url1", "url2", "url3"]
    const imagensArray = imagens.split(',').map(img => img.trim()).filter(Boolean);
    const imagensJson = JSON.stringify(imagensArray);

    // Cria uma nova entidade de produto (o ID nulo fará com que um novo seja gerado)
    const novoProduto = new ProdutoEntity(
      null,
      nome,
      preco,
      descricao,
      imagensJson,
      categoria
    );

    // Envia o novo produto para a função da tela pai (AdminView)
    onSubmit(novoProduto);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} variant="headlineSmall">Adicionar Novo Produto</Text>
      
      <TextInput
        label="Nome do Produto"
        value={nome}
        onChangeText={setNome}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Preço (ex: 15,99)"
        value={preco}
        onChangeText={setPreco}
        mode="outlined"
        keyboardType="decimal-pad"
        style={styles.input}
      />
      <TextInput
        label="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        mode="outlined"
        multiline
        numberOfLines={3}
        style={styles.input}
      />
      <TextInput
        label="Imagens (separadas por vírgula)"
        value={imagens}
        onChangeText={setImagens}
        mode="outlined"
        placeholder="url1.jpg, url2.jpg, nome_local"
        style={styles.input}
      />
      <TextInput
        label="Categoria (ex: Brigadeiro, Bolo)"
        value={categoria}
        onChangeText={setCategoria}
        mode="outlined"
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <Button onPress={onCancel} mode="outlined" style={styles.button}>
          Cancelar
        </Button>
        <Button onPress={handleSave} mode="contained" buttonColor='#4B2412' style={styles.button}>
          Salvar Produto
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#4B2412',
  },
  input: {
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  }
});
