import { useRouter } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';
import AuthForm from '../components/AuthForm';
import UsuarioService from '../services/UsuarioService';
import UsuarioEntity from '../entities/UsuarioEntity';
import { useState } from 'react';

// Esta é a tela principal de autenticação: ela serve tanto para "Entrar" (Login) quanto para "Cadastrar"
export default function LoginView() {
  const router = useRouter();
  
  // Variável que diz se a tela está no modo "Login" (true) ou "Cadastro" (false)
  const [isLogin, setIsLogin] = useState(true);

  // Função chamada quando o usuário clica no botão de confirmar (Entrar ou Cadastrar)
  const handleSubmit = async (dadosDoFormulario) => {
    try {
      
      // ===== FLUXO DE LOGIN =====
      if (isLogin) {
        
        // 1. Verifica se o e-mail digitado já existe no banco de dados
        const usuarioNoBanco = await UsuarioService.findByEmail(dadosDoFormulario.email);
        
        // 2. Se o e-mail NÃO existir, avisa o usuário e muda a tela para o modo de Cadastro
        if (!usuarioNoBanco) {
            Alert.alert(
                "Atenção", 
                "E-mail não encontrado. Vamos criar uma conta para você!",
                [
                    { text: "OK", onPress: () => setIsLogin(false) } // Muda para tela de cadastro
                ]
            );
            return; // Para a execução aqui
        }

        // 3. Se o e-mail existir, tenta fazer o login (verifica se a senha está correta)
        const loginComSucesso = await UsuarioService.login(dadosDoFormulario.email, dadosDoFormulario.password);
        
        if (loginComSucesso) {
          Alert.alert("Sucesso", "Bem-vindo de volta!");
          // Se deu tudo certo, manda o usuário para a página inicial (Home)
          router.replace('/views/HomeView');
        } else {
          Alert.alert("Erro", "A senha que você digitou está incorreta.");
        }
      
      // ===== FLUXO DE CADASTRO =====  
      } else {
        
        // 1. Verifica se o usuário preencheu todos os campos necessários
        if (!dadosDoFormulario.name || !dadosDoFormulario.email || !dadosDoFormulario.password) {
          Alert.alert("Atenção", "Por favor, preencha todos os campos para se cadastrar.");
          return;
        }

        // 2. Verifica se o e-mail que ele está tentando usar já não foi cadastrado antes
        const emailJaExiste = await UsuarioService.findByEmail(dadosDoFormulario.email);
        if (emailJaExiste) {
          Alert.alert("Atenção", "Esse e-mail já está sendo usado por outra conta.");
          return;
        }

        // 3. Cria a "ficha" do novo usuário e salva no banco de dados
        const novoUsuario = new UsuarioEntity(null, dadosDoFormulario.name, dadosDoFormulario.email, dadosDoFormulario.password);
        await UsuarioService.save(novoUsuario);
        
        Alert.alert("Sucesso", "Sua conta foi criada com sucesso!");
        
        // 4. Manda o novo usuário direto para a página inicial
        router.replace('/views/HomeView');
      }
      
    } catch (error) {
      console.error(error); // Mostra o erro real no console para o desenvolvedor ver
      Alert.alert("Ops", "Ocorreu um erro inesperado. Tente novamente mais tarde.");
    }
  };

  return (
    <View style={styles.container}>
      {/* 
        Componente do Formulário (caixas de texto). 
        Passamos para ele a função que será executada ao clicar no botão (onSubmit)
        e a função que muda entre modo login/cadastro (onToggleMode) 
      */}
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
    justifyContent: 'center', // Centraliza o formulário no meio da tela
    backgroundColor: '#F2F2F2', // Fundo cinza claro
  },
});
