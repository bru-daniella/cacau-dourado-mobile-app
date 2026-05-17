import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { Text, useTheme, Divider, Button } from "react-native-paper";
import { useRouter } from "expo-router";
import UsuarioService from "../services/UsuarioService";
import ProdutosService from "../services/ProdutosService";
import AdminUserCard from "../components/AdminUserCard";

export default function AdminView() {
  const theme = useTheme();
  const router = useRouter();
  const [usuarios, setUsuarios] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    const verificarPermissaoECarregar = async () => {
      // 1. Pega o usuário logado atual
      const usuarioLogado = UsuarioService.getUsuarioLogado();
      
      // 2. Verifica se existe alguém logado e se o email é o do admin
      if (!usuarioLogado || usuarioLogado.email !== "admin@cacaudourado.com") {
        setIsAdmin(false); // Não é admin
        Alert.alert(
          "Acesso Negado", 
          "Você não tem permissão para acessar esta página.",
          [{ text: "Voltar para Home", onPress: () => router.replace("/views/HomeView") }]
        );
        return; // Para a execução
      }

      // 3. Se for admin, carrega a lista de usuários do banco
      const listaUsuarios = await UsuarioService.findAll();
      setUsuarios(listaUsuarios);
    };
    
    verificarPermissaoECarregar();
  }, [router]);

  // Função para limpar o banco de produtos e forçar a recarga dos dados iniciais
  const resetarBancoProdutos = async () => {
    Alert.alert(
      "Atenção",
      "Isso irá apagar todos os produtos atuais do banco e recarregar os dados do arquivo 'ProdutosService.js'. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sim, Resetar Banco", 
          onPress: async () => {
            try {
              await ProdutosService.clear(); // Limpa a tabela
              await ProdutosService.popularDadosIniciais(); // Insere os mocks de volta
              Alert.alert("Sucesso", "Banco de produtos resetado! As novas imagens e produtos agora estarão visíveis na loja.");
            } catch (error) {
              Alert.alert("Erro", "Falha ao resetar o banco de produtos.");
              console.error(error);
            }
          } 
        }
      ]
    );
  };

  // Se não for admin, mostra uma tela vazia enquanto o alerta redireciona
  if (!isAdmin) {
    return <View style={[styles.container, { backgroundColor: theme.colors.background }]} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={styles.titulo}>Painel Admin</Text>
      
      {/* Botão Utilitário para o Admin sincronizar os produtos do código com o banco SQLite */}
      <View style={styles.adminActions}>
        <Button 
          mode="contained" 
          buttonColor="#d32f2f" 
          icon="database-refresh"
          onPress={resetarBancoProdutos}
        >
          Sincronizar Novos Produtos
        </Button>
      </View>

      <Text variant="titleMedium" style={styles.subTitulo}>Usuários Cadastrados ({usuarios.length})</Text>
      
      <Divider style={styles.divider} />

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <AdminUserCard usuario={item} />}
        contentContainerStyle={styles.list}
      />
      
      <Button 
        mode="outlined" 
        style={styles.btnVoltar} 
        onPress={() => router.push("/views/HomeView")}
      >
        Voltar para a Loja
      </Button>
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
    marginVertical: 8,
    color: "#4B2412",
    fontWeight: "bold",
  },
  adminActions: {
    marginBottom: 20,
    alignItems: "center",
  },
  subTitulo: {
    marginBottom: 16,
    color: "#4B2412",
  },
  divider: {
    marginBottom: 16,
  },
  list: {
    paddingBottom: 20,
  },
  btnVoltar: {
    marginTop: 16,
    borderColor: "#4B2412"
  }
});
