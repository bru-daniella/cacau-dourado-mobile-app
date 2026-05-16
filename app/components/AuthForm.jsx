import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Text, Surface } from 'react-native-paper';

/**
 * Este é o componente do formulário de autenticação.
 * Ele é "burro", ou seja, apenas mostra os campos e avisa a tela "pai" (LoginView)
 * quando o usuário digita algo ou clica nos botões.
 * 
 * Props que ele recebe:
 * - onSubmit: A função que será chamada quando o botão principal for pressionado.
 * - isLogin: Um booleano que diz se o formulário deve estar no modo "Login" ou "Cadastro".
 * - onToggleMode: A função que será chamada para alternar entre os modos de login e cadastro.
 */
export default function AuthForm({ onSubmit, isLogin, onToggleMode }) {
  // Estados para guardar o que o usuário digita nos campos
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Função que é chamada quando o botão principal (Entrar/Cadastrar) é pressionado
  const handleSubmit = () => {
    // Verifica se a função onSubmit foi passada pela tela pai
    if (onSubmit) {
      // Chama a função da tela pai, enviando os dados que o usuário digitou
      onSubmit({ email, password, name });
    }
  };

  return (
    // O 'Surface' é como um cartão elevado, para dar um destaque visual
    <Surface style={styles.container} elevation={2}>
      
      {/* Título do formulário, que muda dependendo do modo */}
      <Text variant="headlineMedium" style={styles.title}>
        {isLogin ? 'Entrar' : 'Cadastrar'}
      </Text>

      {/* O campo de "Nome" só aparece se não estiver no modo de login (ou seja, no modo de cadastro) */}
      {!isLogin && (
        <TextInput
          label="Nome"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
        />
      )}

      {/* Campo de E-mail */}
      <TextInput
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address" // Mostra um teclado otimizado para e-mails
        autoCapitalize="none" // Não deixa a primeira letra maiúscula automaticamente
        style={styles.input}
      />

      {/* Campo de Senha */}
      <TextInput
        label="Senha"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry // Esconde a senha (mostra bolinhas)
        style={styles.input}
      />

      {/* Botão Principal */}
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        {isLogin ? 'Entrar' : 'Cadastrar'}
      </Button>

      {/* Botão secundário para alternar entre os modos */}
      <Button mode="text" onPress={onToggleMode}>
        {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Entre'}
      </Button>
    </Surface>
  );
}

// Estilos para os componentes visuais
const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 16,
    borderRadius: 8,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
    marginBottom: 8,
  },
});
