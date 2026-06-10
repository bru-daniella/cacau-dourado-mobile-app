import { useRouter, usePathname } from "expo-router";
import { useState, useEffect } from "react";
import {StyleSheet, View, Image, Text} from "react-native";
import { Appbar, Badge, Divider, Menu } from "react-native-paper";
import UsuarioService from "../services/UsuarioService";
import { useCart } from "../contexts/CartContext";

const logoCacauDourado = require("../../assets/images/logo/logo-cacau-dourado.png");

export default function TopDropDownMenu() {
  const [hamburgerVisible, setHamburguerVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);

  const [isLogado, setIsLogado] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const { quantidadeTotal } = useCart();

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
          onPress={() => navegarPara("/views/DocesListView?categoria=Brigadeiro")}
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
          <Menu.Item
            onPress={fazerLogout}
            title="Sair da conta"
          />
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

      <View style={styles.logoTituloContainer}>
        <Image
            source={logoCacauDourado}
            style={styles.logo}
            resizeMode="cover"
        />

        <Text style={styles.title}>
          Cacau Dourado
        </Text>
      </View>

      <Menu
        visible={cartVisible}
        onDismiss={() => setCartVisible(false)}
        anchor={
          <View style={styles.cartContainer}>
            <Appbar.Action
              icon="cart"
              iconColor="#FFFFFF"
              onPress={() => setCartVisible(true)}
            />

            {quantidadeTotal > 0 && (
              <Badge style={styles.cartBadge}>
                {quantidadeTotal}
              </Badge>
            )}
          </View>
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

  logoTituloContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 10,
    backgroundColor: "#FFFFFF",
  },

  title: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  adminTitle: {
    fontWeight: "bold",
    color: "#4B2412",
  },
  cartContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#D4AF37",
    color: "#4B2412",
    fontWeight: "bold",
  },
});