import AsyncStorage from "@react-native-async-storage/async-storage";
import ProdutoEntity from "../entities/ProdutoEntity";

const STORAGE_KEY = "@produtos";

let produtos = [
  new ProdutoEntity(
    "1",
    "Brigadeiro",
    "5,99",
    "Um doce para adoçar seu dia! O brigadeiro é um clássico brasileiro feito com leite condensado, chocolate em pó, manteiga e granulado de chocolate.",
    "https://i.pravatar.cc/150?img=1",
    "Brigadeiro"
  ),
  new ProdutoEntity(
    "2",
    "Beijinho",
    "5,99",
    "Um doce para adoçar seu dia! O beijinho é um clássico brasileiro feito com leite condensado, coco ralado e manteiga.",
    "https://i.pravatar.cc/150?img=2",
    "Beijinho"
  ),
  new ProdutoEntity(
    "3",
    "Brownie",
    "12,99",
    "Um doce para adoçar seu dia! O brownie é um clássico americano feito com chocolate, farinha, ovos e açúcar. Textura macia e sabor intenso.",
    "https://i.pravatar.cc/150?img=3",
    "Brownie"
  ),
];

export default class ProdutosService {
  static async findAll() {
    const json = await AsyncStorage.getItem(STORAGE_KEY);

    if (json) {
      const lista = JSON.parse(json);
      produtos = lista.map((item) => ProdutoEntity.transforme(item));
      return [...produtos];
    }

    return [...produtos]; // Retorna mock initial se vazio
  }

  static async findById(id) {
    const lista = await this.findAll();
    return lista.find((item) => item.id === String(id)) ?? null;
  }

  static async save(produto) {
    const lista = await this.findAll();

    const index = lista.findIndex((item) => item.id === produto.id);

    if (index >= 0) {
      lista[index] = produto;
    } else {
      lista.push(produto);
    }

    produtos = lista;

    await this.saveAll(lista);

    return produto;
  }

  static async saveAll(lista) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
  }

  static async clear() {
    await AsyncStorage.removeItem(STORAGE_KEY);
    produtos = [];
  }
}
