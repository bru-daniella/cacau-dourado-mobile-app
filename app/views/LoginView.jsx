import { useRouter } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';
import AuthForm from '../components/AuthForm';
import UsuarioService from '../services/UsuarioService';
import UsuarioEntity from '../entities/UsuarioEntity';
import { useState } from 'react';

export default function LoginView() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (data) => {
    try {
      if (isLogin) {
        // Lógica de Login
        const usuario = await UsuarioService.findByEmail(data.email);
        
        if (!usuario) {
            Alert.alert(
                "Erro", 
                "E-mail não existente. Redirecionando para cadastro...",
                [
                    { text: "OK", onPress: () => setIsLogin(false) }
                ]
            );
            return; 
        }

        const usuarioLogado = await UsuarioService.login(data.email, data.password);
        
        if (usuarioLogado) {
          Alert.alert("Sucesso", "Login realizado com sucesso!");
          router.replace('/views/HomeView');
        } else {
          Alert.alert("Erro", "Senha incorreta.");
        }
      } else {
        // Lógica de Cadastro
        if (!data.name || !data.email || !data.password) {
          Alert.alert("Erro", "Preencha todos os campos.");
          return;
        }

        const usuarioExistente = await UsuarioService.findByEmail(data.email);
        if (usuarioExistente) {
          Alert.alert("Erro", "Já existe um usuário com este e-mail.");
          return;
        }

        const novoUsuario = new UsuarioEntity(null, data.name, data.email, data.password);
        await UsuarioService.save(novoUsuario);
        Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
        // Navegar para a tela principal (Home) após cadastro
        router.replace('/views/HomeView');
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Ocorreu um erro ao processar sua solicitação.");
    }
  };

  return (
    <View style={styles.container}>
      <AuthForm 
        onSubmit={handleSubmit} 
        isLogin={isLogin} 
        onToggleMode={() => setIsLogin(!isLogin)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
  },
});