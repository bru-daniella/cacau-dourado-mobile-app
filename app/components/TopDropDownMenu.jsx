import { useFonts } from "expo-font";
import { usePathname, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Divider, Menu, Badge } from "react-native-paper";
import UsuarioService from "../services/UsuarioService";
import ProdutosService from "../services/ProdutosService";
import { useCart } from "../contexts/CartContext";

export default function TopDropDownMenu() {
  useFonts({
    Whisper: require("../../assets/fonts/Whisper.ttf"),
  });

  const [hamburgerVisible, setHamburguerVisible] = useState(false);
  
  // Estados para saber se tem alguém logado, e se esse alguém é admin
  const [isLogado, setIsLogado] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [categoriasMenu, setCategoriasMenu] = useState([]);

  const router = useRouter();
  const pathname = usePathname(); // Usado para forçar a re-renderização quando mudamos de tela

  const [loaded, error] = useFonts({
    Whisper: require("../../assets/fonts/Whisper.ttf"),
  });

  useEffect(() => {
    const buscarCategorias = async () => {
      try {
        const todosProdutos = await ProdutosService.findAll();
        const categoriasUnicas = [...new Set(todosProdutos.map(p => p.categoria))].filter(Boolean);
        setCategoriasMenu(categoriasUnicas);
      } catch (e) {
        console.log("Erro ao buscar categorias para o menu", e);
      }
    };
    
    buscarCategorias();
  }, []);

  useEffect(() => {
    const verificarUsuarioLogado = () => {
      const usuarioLogado = UsuarioService.getUsuarioLogado();
      if (usuarioLogado) {
        setIsLogado(true);
        setIsAdmin(usuarioLogado.email === "admin@cacaudourado.com");
      } else {
        setIsLogado(false);
        setIsAdmin(false);
      }
    };
    verificarUsuarioLogado();
  }, [pathname]);

  const abrirHamburguerMenu = () => setHamburguerVisible(true);
  const fecharHamburguerMenu = () => setHamburguerVisible(false);

  const navegarPara = (rota) => {
    fecharHamburguerMenu();
    router.push(rota);
  };

  const fazerLogout = () => {
    UsuarioService.logout();
    setIsLogado(false);
    setIsAdmin(false);
    navegarPara("/views/LoginView");
  };

  return (
    <Appbar.Header style={styles.header}>
      <Menu
        visible={hamburgerVisible}
        onDismiss={fecharHamburguerMenu}
        anchor={
          <Appbar.Action
            icon="menu"
            iconColor="#FFFFFF"
            onPress={abrirHamburguerMenu}
          />
        }
      >
        <Menu.Item
          onPress={() => navegarPara("/views/HomeView")}
          title="Início"
        />
        <Divider />
        {categoriasMenu.map(categoria => (
          <Menu.Item
            key={categoria}
            onPress={() => navegarPara(`/views/DocesListView?categoria=${categoria}`)}
            title={`${categoria}s`}
          />
        ))}
        <Divider />
        {!isLogado ? (
          <Menu.Item
            onPress={() => navegarPara("/views/LoginView")}
            title="Entrar / Cadastrar"
          />
        ) : (
          <Menu.Item onPress={fazerLogout} title="Sair da conta" />
        )}
        {isAdmin && (
          <>
            <Divider />
            <Menu.Item
              onPress={() => navegarPara("/views/AdminView")}
              title="Painel Admin"
              titleStyle={styles.adminTitle}
            />
          </>
        )}
      </Menu>

      <Appbar.Content
        title="Cacau Dourado"
        fontFamily="Whisper"
        titleStyle={styles.title}
        style={{ flex: 1 }}
        onPress={() => router.push('/views/HomeView')}
      />

      <Appbar.Action
        icon="cart"
        iconColor="#FFF"
        onPress={() => router.push('/views/CarrinhoView')}
      />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#4B2412",
  },
  title: {
    color: "#FFFFFF",
    fontFamily: "Whisper",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  adminTitle: {
    fontWeight: "bold",
    color: "#4B2412",
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#FF6347',
    color: 'white',
    fontWeight: 'bold',
  }
});
