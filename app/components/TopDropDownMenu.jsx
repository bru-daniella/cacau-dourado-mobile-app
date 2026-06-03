import { useFonts } from "expo-font";
import { usePathname, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Appbar, Divider, Menu } from "react-native-paper";
import UsuarioService from "../services/UsuarioService";

export default function TopDropDownMenu() {
  const [loaded, error] = useFonts({
    Whisper: require("../../assets/fonts/Whisper.ttf"),
  });

  const [hamburgerVisible, setHamburguerVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);

  const [isLogado, setIsLogado] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const verificarUsuarioLogado = async () => {
      const usuarioLogado = UsuarioService.getUsuarioLogado();

      if (usuarioLogado) {
        setIsLogado(true);

        if (usuarioLogado.email === "admin@cacaudourado.com") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
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
    setCartVisible(false);
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

        <Menu.Item
          onPress={() =>
            navegarPara("/views/DocesListView?categoria=Brigadeiro")
          }
          title="Brigadeiros"
        />

        <Menu.Item
          onPress={() => navegarPara("/views/DocesListView?categoria=Beijinho")}
          title="Beijinhos"
        />

        <Menu.Item
          onPress={() => navegarPara("/views/DocesListView?categoria=Brownie")}
          title="Brownies"
        />

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

      <Appbar.Content title="Cacau Dourado" titleStyle={styles.title} />

      <Menu
        visible={cartVisible}
        onDismiss={() => setCartVisible(false)}
        anchor={
          <Appbar.Action
            icon="cart"
            iconColor="#FFFFFF"
            onPress={() => setCartVisible(true)}
          />
        }
      >
        <Menu.Item
          onPress={() => navegarPara("/views/CarrinhoView")}
          title="Ver Carrinho"
        />
      </Menu>
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
});
