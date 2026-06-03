import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import ProductCard from "../components/ProductCard.jsx";
import ProdutosService from "../services/ProdutosService";
import UsuarioService from "../services/UsuarioService";
import { useCart } from "../contexts/CartContext"; // Importamos o hook do carrinho

// Esta tela mostra a lista de doces para o cliente comprar
export default function DocesListView() {
  // Pega a categoria selecionada (ex: "Brigadeiro") que vem da URL
  const { categoria } = useLocalSearchParams();
  const router = useRouter();

  // Traz a função de adicionar do nosso Contexto Global do Carrinho
  const { adicionarAoCarrinho } = useCart();

  // Guarda a lista de doces que vai aparecer na tela
  const [doces, setDoces] = useState([]);
  const theme = useTheme();

  // Executa assim que a tela abre ou quando a categoria muda
  useEffect(() => {
    const carregarProdutos = async () => {
      // 1. Busca todos os produtos do banco de dados
      const todosProdutos = await ProdutosService.findAll();

      // 2. Filtra os produtos: Se tiver uma categoria escolhida, mostra só os da categoria. Se não, mostra todos.
      const docesFiltrados = categoria
        ? todosProdutos.filter((produto) => produto.categoria === categoria)
        : todosProdutos;

      // 3. Salva os produtos filtrados para mostrar na tela
      setDoces(docesFiltrados);
    };

    carregarProdutos();
  }, [categoria]);

  // Função chamada quando o usuário clica no botão "Adicionar ao Carrinho"
  const handleAdicionarAoCarrinho = (produtoSelecionado) => {
    // 1. Verifica se existe um usuário logado
    const usuarioAtual = UsuarioService.getUsuarioLogado();

    // 2. Se NÃO houver usuário logado, barra a ação e sugere o login
    if (!usuarioAtual) {
      Alert.alert(
        "Login Necessário",
        "Você precisa estar logado para adicionar produtos à cesta. Deseja fazer login agora?",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Ir para Login", onPress: () => router.push('/views/LoginView') }
        ]
      );
      return; // Para a execução aqui, não adiciona ao carrinho
    }

    // 3. Se houver usuário logado, continua o fluxo normal
    adicionarAoCarrinho(produtoSelecionado);
    Alert.alert(
      "Sucesso",
      `${produtoSelecionado.nome} foi adicionado à sua cesta!`,
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Título da página */}
      <Text variant="headlineMedium" style={styles.titulo}>
        {categoria ? `Nossos ${categoria}s` : "Nossos Doces"}
      </Text>

      {/* Lista que repete o cartão para cada doce encontrado */}
      <FlatList
        data={doces}
        keyExtractor={(produto) => produto.id.toString()}
        renderItem={({ item }) => (
          <ProductCard produto={item} onAddToCart={handleAdicionarAoCarrinho} />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

// Estilos visuais da tela (cores, margens, tamanhos)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  
  titulo: {
    textAlign: "center",
    marginVertical: 16,
    color: "#4B2412",
    fontWeight: "bold",
  },
  
  list: {
    paddingBottom: 20,
  },
});
