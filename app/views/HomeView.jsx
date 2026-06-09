import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import UsuarioService from "../services/UsuarioService";
import ProdutosService from "../services/ProdutosService";
import RecommendationCard from "../components/RecommendationCard";

export default function HomeView() {
  const theme = useTheme();
  const router = useRouter();
  const [produtosPorCategoria, setProdutosPorCategoria] = useState({});

  useEffect(() => {
    UsuarioService.initAdminUser();

    const carregarProdutos = async () => {
      const todosProdutos = await ProdutosService.findAll();
      const agrupados = todosProdutos.reduce((acc, produto) => {
        const { categoria } = produto;
        if (!acc[categoria]) {
          acc[categoria] = [];
        }
        acc[categoria].push(produto);
        return acc;
      }, {});
      setProdutosPorCategoria(agrupados);
    };

    carregarProdutos();
  }, []);

  const renderRoleta = ({ item: categoria }) => (
    <View style={style.categoriaContainer}>
      <View style={style.headerCategoria}>
        <Text style={style.categoriaTitulo}>{categoria}</Text>
        <TouchableOpacity onPress={() => router.push(`/views/DocesListView?categoria=${categoria}`)}>
          <Text style={style.verMaisText}>Ver mais</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={produtosPorCategoria[categoria]}
        renderItem={({ item }) => <RecommendationCard produto={item} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.roleta}
      />
    </View>
  );

  return (
    <View
      style={[style.container, { backgroundColor: theme.colors.background }]}
    >
      <FlatList
        data={Object.keys(produtosPorCategoria)}
        renderItem={renderRoleta}
        keyExtractor={(categoria) => categoria}
        contentContainerStyle={style.conteudo}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  conteudo: {
    paddingVertical: 16,
  },
  categoriaContainer: {
    marginBottom: 24,
  },
  headerCategoria: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  categoriaTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4B2412",
  },
  verMaisText: {
    fontSize: 14,
    color: "#7babe7",
    fontWeight: "bold",
  },
  roleta: {
    paddingLeft: 16,
  },
});
