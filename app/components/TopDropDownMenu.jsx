import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Appbar, Divider, Menu } from "react-native-paper";
export default function TopDropDownMenu() {
  const [hamburgerVisible, setHamburguerVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const router = useRouter();
  const [loaded, error] = useFonts({
    Whisper: require("../../assets/fonts/Whisper.ttf"),
  });
  const abrirHamburguerMenu = () => setHamburguerVisible(true);
  const fecharHamburguerMenu = () => setHamburguerVisible(false);

  const navegarPara = (rota) => {
    fecharHamburguerMenu();
    router.push(rota);
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

        <Menu.Item
          onPress={() => navegarPara("/views/ContatoListView")}
          title="Contatos"
        />

        <Menu.Item
          onPress={() => navegarPara("/views/ContatoFormView")}
          title="Novo contato"
        />

        <Divider />

        <Menu.Item
          onPress={() => navegarPara("/views/LoginView")}
          title="Login / Sair"
        />
      </Menu>

      <Appbar.Content
        title="Cacau Dourado"
        fontFamily="Whisper"
        titleStyle={styles.title}
      />
      {/* <Searchbar placeholder="teste" style={styles.searchbar} /> */}

      <Menu
        visible={cartVisible}
        onDismiss={() => setCartVisible(false)}
        anchor={
          <Appbar.Action
            icon="cart"
            iconColor="#FFF"
            onPress={() => setCartVisible(true)}
          />
        }
      >
        <Menu.Item
          onPress={() => navegarPara("/views/HomeView")}
          title="Início"
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
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "Whisper",
    textAlign: "center",
  },
  searchbar: {
    flex: 1,
    height: 40,
  },
  icon: {
    borderColor: "#FFF",
    borderWidth: 1,
    borderRadius: 100,
  },
});
