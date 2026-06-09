import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Divider,
  RadioButton,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useRouter } from "expo-router";
import { useCart } from "../contexts/CartContext";

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function aplicarMascaraWhatsapp(valor) {
  const somenteNumeros = valor.replace(/\D/g, "").slice(0, 11);

  if (somenteNumeros.length <= 2) {
    return somenteNumeros;
  }

  if (somenteNumeros.length <= 7) {
    return `(${somenteNumeros.slice(0, 2)}) ${somenteNumeros.slice(2)}`;
  }

  return `(${somenteNumeros.slice(0, 2)}) ${somenteNumeros.slice(2, 7)}-${somenteNumeros.slice(7)}`;
}

export default function CheckoutView() {
  const theme = useTheme();
  const router = useRouter();

  const {
    cartItems,
    quantidadeTotal,
    valorTotal,
    limparCarrinho,
  } = useCart();

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [observacao, setObservacao] = useState("");
  const [tipoEntrega, setTipoEntrega] = useState("retirada");
  const [formaPagamento, setFormaPagamento] = useState("pix");
  const [pedidoFinalizado, setPedidoFinalizado] = useState(false);

  const finalizarPedido = () => {
    if (!nome.trim() || !telefone.trim()) {
      Alert.alert("Atenção", "Preencha seu nome e telefone para continuar.");
      return;
    }

    if (tipoEntrega === "entrega" && !endereco.trim()) {
      Alert.alert("Atenção", "Informe o endereço para entrega.");
      return;
    }

    setPedidoFinalizado(true);
    limparCarrinho();
  };

  const voltarParaHome = () => {
    router.replace("/views/HomeView");
  };

  if (pedidoFinalizado) {
    return (
      <View style={[styles.containerSucesso, { backgroundColor: theme.colors.background }]}>
        <Card style={styles.cardSucesso}>
          <Card.Content>
            <Text style={styles.iconeSucesso}>🍫</Text>

            <Text variant="headlineSmall" style={styles.tituloSucesso}>
              Pedido confirmado!
            </Text>

            <Text style={styles.textoSucesso}>
              Obrigado por comprar na Cacau Dourado. Seu pedido foi registrado com sucesso.
            </Text>

            <Text style={styles.textoResumoFinal}>
              Em breve entraremos em contato pelo telefone informado para combinar os detalhes.
            </Text>

            <Button
              mode="contained"
              buttonColor="#4B2412"
              style={styles.botaoFinal}
              labelStyle={styles.textoBotao}
              onPress={voltarParaHome}
            >
              Voltar para o início
            </Button>
          </Card.Content>
        </Card>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.conteudo}
    >
      <Text variant="headlineMedium" style={styles.titulo}>
        Finalizar Pedido
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.subtitulo}>
            Resumo do Pedido
          </Text>

          {cartItems.map((item) => (
            <View key={String(item.id)} style={styles.itemResumo}>
              <View style={styles.itemInfo}>
                <Text style={styles.nomeProduto}>{item.nome}</Text>
                <Text style={styles.quantidadeProduto}>
                  Quantidade: {item.quantidade}
                </Text>
              </View>

              <Text style={styles.precoProduto}>
                {formatarMoeda(
                  Number(String(item.preco).replace("R$", "").replace(".", "").replace(",", ".")) *
                    item.quantidade
                )}
              </Text>
            </View>
          ))}

          <Divider style={styles.divisor} />

          <View style={styles.linhaResumo}>
            <Text style={styles.labelResumo}>Total de itens</Text>
            <Text style={styles.valorResumo}>{quantidadeTotal}</Text>
          </View>

          <View style={styles.linhaResumo}>
            <Text style={styles.labelTotal}>Total</Text>
            <Text style={styles.valorTotal}>{formatarMoeda(valorTotal)}</Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.subtitulo}>
            Dados do Cliente
          </Text>

          <TextInput
            label="Nome"
            value={nome}
            onChangeText={setNome}
            mode="outlined"
            style={styles.input}
            outlineColor="#B58B5A"
            activeOutlineColor="#4B2412"
          />

          <TextInput
            label="Telefone / WhatsApp"
            value={telefone}
            onChangeText={(valor) => setTelefone(aplicarMascaraWhatsapp(valor))}
            mode="outlined"
            keyboardType="phone-pad"
            maxLength={15}
            style={styles.input}
            outlineColor="#B58B5A"
            activeOutlineColor="#4B2412"
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.subtitulo}>
            Entrega
          </Text>

          <RadioButton.Group
            onValueChange={setTipoEntrega}
            value={tipoEntrega}
          >
            <RadioButton.Item
              label="Retirar na loja"
              value="retirada"
              color="#4B2412"
            />

            <RadioButton.Item
              label="Entrega"
              value="entrega"
              color="#4B2412"
            />
          </RadioButton.Group>

          {tipoEntrega === "entrega" && (
            <TextInput
              label="Endereço para entrega"
              value={endereco}
              onChangeText={setEndereco}
              mode="outlined"
              multiline
              style={styles.input}
              outlineColor="#B58B5A"
              activeOutlineColor="#4B2412"
            />
          )}

          <TextInput
            label="Observações do pedido"
            value={observacao}
            onChangeText={setObservacao}
            mode="outlined"
            multiline
            style={styles.input}
            outlineColor="#B58B5A"
            activeOutlineColor="#4B2412"
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.subtitulo}>
            Pagamento
          </Text>

          <RadioButton.Group
            onValueChange={setFormaPagamento}
            value={formaPagamento}
          >
            <RadioButton.Item
              label="Pix fictício"
              value="pix"
              color="#4B2412"
            />

            <RadioButton.Item
              label="Cartão na entrega"
              value="cartao"
              color="#4B2412"
            />

            <RadioButton.Item
              label="Dinheiro"
              value="dinheiro"
              color="#4B2412"
            />
          </RadioButton.Group>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        buttonColor="#4B2412"
        style={styles.botaoFinal}
        labelStyle={styles.textoBotao}
        onPress={finalizarPedido}
      >
        Confirmar Pedido
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  conteudo: {
    padding: 16,
    paddingBottom: 32,
  },
  titulo: {
    textAlign: "center",
    color: "#4B2412",
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 14,
  },
  subtitulo: {
    color: "#4B2412",
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemResumo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  itemInfo: {
    flex: 1,
    paddingRight: 8,
  },
  nomeProduto: {
    color: "#4B2412",
    fontWeight: "bold",
  },
  quantidadeProduto: {
    color: "#555",
    marginTop: 2,
  },
  precoProduto: {
    color: "#4B2412",
    fontWeight: "bold",
  },
  divisor: {
    marginVertical: 10,
  },
  linhaResumo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  labelResumo: {
    color: "#4B2412",
    fontSize: 15,
  },
  valorResumo: {
    fontWeight: "bold",
    fontSize: 15,
  },
  labelTotal: {
    color: "#4B2412",
    fontSize: 20,
    fontWeight: "bold",
  },
  valorTotal: {
    color: "#4B2412",
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    marginTop: 10,
    backgroundColor: "#FFFFFF",
  },
  botaoFinal: {
    borderRadius: 18,
    paddingVertical: 8,
    marginTop: 8,
  },
  textoBotao: {
    fontSize: 16,
    fontWeight: "bold",
  },
  containerSucesso: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  cardSucesso: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 20,
  },
  iconeSucesso: {
    fontSize: 48,
    textAlign: "center",
    marginBottom: 12,
  },
  tituloSucesso: {
    textAlign: "center",
    color: "#4B2412",
    fontWeight: "bold",
    marginBottom: 12,
  },
  textoSucesso: {
    textAlign: "center",
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  textoResumoFinal: {
    textAlign: "center",
    color: "#666",
    marginBottom: 16,
  },
});