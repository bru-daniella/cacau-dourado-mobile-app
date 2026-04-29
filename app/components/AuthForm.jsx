import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Text, Surface } from 'react-native-paper';

export default function AuthForm({ onSubmit }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ email, password, name, isLogin });
    }
  };

  return (
    <Surface style={styles.container} elevation={2}>
      <Text variant="headlineMedium" style={styles.title}>
        {isLogin ? 'Entrar' : 'Cadastrar'}
      </Text>

      {!isLogin && (
        <TextInput
          label="Nome"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
        />
      )}

      <TextInput
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        label="Senha"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />

      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        {isLogin ? 'Entrar' : 'Cadastrar'}
      </Button>

      <Button mode="text" onPress={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Entre'}
      </Button>
    </Surface>
  );
}

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
