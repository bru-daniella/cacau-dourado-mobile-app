import { useFonts } from "expo-font";
import { useRouter, usePathname } from "expo-router";
import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Appbar, Divider, Menu } from "react-native-paper";
import UsuarioService from "../services/UsuarioService";

export default function TopDropDownMenu() {
  const [hamburgerVisible, setHamburguerVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  
  // Estados para saber se tem alguém logado, e se esse alguém é admin
  const [isLogado, setIsLogado] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname(); // Usado para forçar a re-renderização quando mudamos de tela
  
  const [loaded, error] = useFonts({
    Whisper: require("../../assets/fonts/Whisper.ttf"),
  });

  // Sempre que a rota muda (ex: quando o usuário faz login e vai pra home), 
  // nós verificamos quem é o usuário logado.
  useEffect(() => {
    const verificarUsuarioLogado = async () => {
      const usuarioLogado = UsuarioService.getUsuarioLogado();
      
      // Se tiver usuário logado, marca o estado como true, senão false
      if (usuarioLogado) {
        setIsLogado(true);
        
        // Verifica se além de estar logado, ele é o administrador
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
  }, [pathname]); // O useEffect roda de novo sempre que o 'pathname' (URL atual) muda
  
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
        
        {/* Tipos de doces */}
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

        {/* 
          Se NÃO estiver logado, mostra opção de Login.
          Se JÁ ESTIVER logado, mostra opção de Sair.
        */}
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

        {/* O Painel Admin SÓ APARECE se a variável isAdmin for verdadeira */}
        {isAdmin && (
          <>
            <Divider />
            <Menu.Item
              onPress={() => navegarPara("/views/AdminView")}
              title="Painel Admin"
              titleStyle={{ fontWeight: "bold", color: "#4B2412" }}
            />
          </>
        )}
      </Menu>

      <Appbar.Content
        title="Cacau Dourado"
        fontFamily="Whisper"
        titleStyle={styles.title}
      />

      {/* 
        O ícone do carrinho só faz sentido se o usuário estiver logado.
        Caso contrário, você pode esconder ou deixar visível pedindo login depois.
        Neste caso, vou manter visível, pois ele pode navegar antes de logar.
      */}
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
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "Whisper",
    textAlign: "center",
  },
});
