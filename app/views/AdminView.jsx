import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Alert, ScrollView } from "react-native";
import { Text, useTheme, Divider, Button } from "react-native-paper";
import { useRouter, useFocusEffect } from "expo-router"; // Importando useFocusEffect
import UsuarioService from "../services/UsuarioService";
import ProdutosService from "../services/ProdutosService";
import AdminUserCard from "../components/AdminUserCard";

export default function AdminView() {
  const theme = useTheme();
  const router = useRouter();
  const [usuarios, setUsuarios] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);

  // Função para recarregar os dados da tela (usuários)
  const carregarDados = async () => {
    try {
      const listaUsuarios = await UsuarioService.findAll();
      setUsuarios(listaUsuarios);
    } catch (error) {
      console.error("Erro ao carregar dados do admin:", error);
    }
  };

  // useFocusEffect é um hook do Expo Router que roda toda vez que a tela entra em foco.
  // Isso garante que, ao voltar da tela de adicionar produto, os dados sejam atualizados.
  useFocusEffect(
    React.useCallback(() => {
      const verificarPermissao = async () => {
        const usuarioLogado = UsuarioService.getUsuarioLogado();
        if (!usuarioLogado || usuarioLogado.email !== "admin@cacaudourado.com") {
          setIsAdmin(false);
          Alert.alert(
            "Acesso Negado", 
            "Você não tem permissão para acessar esta página.",
            [{ text: "Voltar para Home", onPress: () => router.replace("/views/HomeView") }]
          );
          return;
        }
        // Se for admin, carrega os dados
        setIsAdmin(true);
        carregarDados();
      };
      
      verificarPermissao();
    }, [])
  );

  const resetarBancoProdutos = async () => {
    Alert.alert(
      "Atenção",
      "Isso irá apagar todos os produtos atuais e recarregar os dados do arquivo 'ProdutosService.js'. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sim, Resetar Banco", 
          onPress: async () => {
            try {
              await ProdutosService.clear();
              await ProdutosService.popularDadosIniciais();
              Alert.alert("Sucesso", "Banco de produtos resetado!");
            } catch (error) {
              Alert.alert("Erro", "Falha ao resetar o banco de produtos.");
              console.error(error);
            }
          } 
        }
      ]
    );
  };

  if (!isAdmin) {
    return <View style={[styles.container, { backgroundColor: theme.colors.background }]} />;
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={styles.titulo}>Painel Admin</Text>
      
      <View style={styles.adminActions}>
        <Button 
          mode="contained" 
          buttonColor="#4B2412" 
          icon="plus"
          onPress={() => router.push('/views/AddProductView')} // Navega para a nova tela
          style={styles.actionButton}
        >
          Adicionar Produto
        </Button>
        <Button 
          mode="contained" 
          buttonColor="#d32f2f" 
          icon="database-refresh"
          onPress={resetarBancoProdutos}
          style={styles.actionButton}
        >
          Sincronizar Mock
        </Button>
      </View>

      <Text variant="titleMedium" style={styles.subTitulo}>Usuários Cadastrados ({usuarios.length})</Text>
      
      <Divider style={styles.divider} />

      {/* A lista de usuários agora não precisa de uma altura fixa, pois a tela rola */}
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <AdminUserCard usuario={item} />}
        contentContainerStyle={styles.list}
        scrollEnabled={false} // Desabilita a rolagem da FlatList para usar a da tela
      />
      
      <Button 
        mode="outlined" 
        style={styles.btnVoltar} 
        onPress={() => router.push("/views/HomeView")}
      >
        Voltar para a Loja
      </Button>
    </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  subTitulo: {
    marginBottom: 16,
    color: "#4B2412",
  },
  divider: {
    marginBottom: 16,
  },
  list: {
    // Não precisa mais de paddingBottom, a rolagem da tela já dá o espaço
  },
  btnVoltar: {
    marginTop: 16,
    borderColor: "#4B2412"
  }
});
