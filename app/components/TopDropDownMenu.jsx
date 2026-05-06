import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Appbar, Divider, Menu } from "react-native-paper";

export default function TopDropDownMenu() {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const abrirMenu = () => setVisible(true);
  const fecharMenu = () => setVisible(false);

  const navegarPara = (rota) => {
    fecharMenu();
    router.push(rota);
  };

  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Content
        title="Cacau Dourado"
        titleStyle={styles.title}
      />

      <Menu
        visible={visible}
        onDismiss={fecharMenu}
        anchor={
          <Appbar.Action
            icon="menu"
            iconColor="#FFFFFF"
            onPress={abrirMenu}
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
  },
});