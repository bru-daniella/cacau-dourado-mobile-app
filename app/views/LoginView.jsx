import { useRouter } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';
import AuthForm from '../components/AuthForm';
import UsuarioEntity from '../entities/UsuarioEntity';

export default function LoginView() {
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      if (data.isLogin) {
        // Lógica de Login
        const usuario = await UsuarioService.login(data.email, data.password);
        if (usuario) {
          Alert.alert("Sucesso", "Login realizado com sucesso!");
          // Navegar para a tela principal (Home)
          router.replace('/views/HomeView');
        } else {
          Alert.alert("Erro", "Email ou senha incorretos.");
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
      <AuthForm onSubmit={handleSubmit} />
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