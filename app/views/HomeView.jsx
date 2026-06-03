import { Banner } from "@react-native-material/core";
import { useEffect, useState } from "react";
import { Image, StyleSheet, View, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import UsuarioService from "../services/UsuarioService";
import ProdutosService from "../services/ProdutosService";
import ProductCarousel from "../components/ProductCarousel"; 
import { useDatabase } from "../contexts/DatabaseContext"; // Adiciona a checagem do banco

export default function HomeView() {
  const theme = useTheme();
  
  // Pegamos o status do banco de dados (se já terminou de carregar)
  const { isDbReady } = useDatabase();

  useEffect(() => {
    // Só tenta criar o admin se o banco estiver pronto
    if (isDbReady) {
      UsuarioService.initAdminUser();
    }
  }, [isDbReady]);

  const [todosOsDoces, setTodosOsDoces] = useState([]);
  const [recomendacoes, setRecomendacoes] = useState([]);

  useEffect(() => {
    const carregarProdutos = async () => {
      // Verifica de novo só pra ter certeza
      if (!isDbReady) return;

      const produtosDoBanco = await ProdutosService.findAll();
      setTodosOsDoces(produtosDoBanco);

      const recomendacoesEmbaralhadas = [...produtosDoBanco].sort(() => 0.5 - Math.random());
      setRecomendacoes(recomendacoesEmbaralhadas.slice(0, 5));
    };

    carregarProdutos();
  }, [isDbReady]); // Só roda quando o banco diz que está pronto

  const categoriasUnicas = [...new Set(todosOsDoces.map(doce => doce.categoria))].filter(Boolean);

  // Se não estiver pronto, nem tenta desenhar a tela ainda
  if (!isDbReady) {
    return null; 
  }

  return (
    <ScrollView style={[style.container, { backgroundColor: theme.colors.background }]}>
      <View style={style.conteudo}>
        <Banner
          style={style.banner}
          text="Conheça as melhores barras recheadas!"
          illustration={
            <Image
              source={require("../../assets/images/banner1.jpg")}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          }
          illustrationContainerStyle={{
            width: "100%",
            height: 150,
            overflow: "hidden",
            borderRadius: 8,
          }}
          textContainerStyle={{
            position: "absolute",
            bottom: 20,
            left: 10,
            right: 80,
            color: "#FFFFFF",
            backgroundColor: "#1d00001f",
            padding: 20,
            borderRadius: 6,
          }}
          textStyle={{
            color: "rgb(255 207 91)",
            fontSize: 25,
            textAlign: "left",
            fontFamily: "Georgia",
            textShadowColor: "#000",
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 3,
          }}
        />
        
        <ProductCarousel 
          titulo="Para Você"
          produtos={recomendacoes}
          verTudoLink="/views/DocesListView"
        />

        {categoriasUnicas.map(categoria => (
          <ProductCarousel 
            key={categoria}
            titulo={`Nossos ${categoria}s`}
            produtos={todosOsDoces.filter(p => p.categoria === categoria)}
            verTudoLink={`/views/DocesListView?categoria=${categoria}`}
          />
        ))}

      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  conteudo: {
    flex: 1,
    backgroundColor: "#fff8f6",
    gap: 10,
    paddingTop: 10,
    paddingBottom: 20,
  },
  banner: {
    backgroundColor: "#fff8f6",
    marginHorizontal: 16,
  },
});
