import AsyncStorage from "@react-native-async-storage/async-storage";
import ContatoEntity from "../entities/ContatoEntity";

const STORAGE_KEY = "@contatos";

let contatos = [
  new ContatoEntity(
    "1",
    "Brigadeiro",
    "5,99",
    "Um doce para adoçar seu dia! O brigadeiro é um clássico brasileiro feito com leite condensado, chocolate em pó, manteiga e granulado de chocolate. Ele é perfeito para festas, sobremesas ou simplesmente para matar a vontade de um docinho. Com sua textura cremosa e sabor irresistível, o brigadeiro é uma escolha deliciosa para qualquer ocasião.",
    "https://i.pravatar.cc/150?img=1",
    true,
    "Trabalho",
    "F"
  ),
  new ContatoEntity(
    "2",
    "Beijinho",
    "5,99",
    "Um doce para adoçar seu dia! O beijinho é um clássico brasileiro feito com leite condensado, chocolate em pó e manteiga. Ele é perfeito para festas, sobremesas ou simplesmente para matar a vontade de um docinho. Com sua textura cremosa e sabor irresistível, o beijinho é uma escolha deliciosa para qualquer ocasião.",
    "https://i.pravatar.cc/150?img=2",
    false,
    "Amigos",
    "M"
  ),
  new ContatoEntity(
    "3",
    "Brownie",
    "5,99",
    "Um doce para adoçar seu dia! O brownie é um clássico americano feito com chocolate, farinha, ovos e açúcar. Ele é perfeito para festas, sobremesas ou simplesmente para matar a vontade de um docinho. Com sua textura macia e sabor intenso, o brownie é uma escolha deliciosa para qualquer ocasião.",
    "https://i.pravatar.cc/150?img=3",
    true,
    "Família",
    "F"
  ),
];

export default class ContatoService {

  static async findAll() {
    const json = await AsyncStorage.getItem(STORAGE_KEY);

    if (json) {
      const lista = JSON.parse(json);
      contatos = lista.map((item) => ContatoEntity.transforme(item));
      return [...contatos];
    }

    // primeira execução
    //await this.saveAll(contatos);
    //return [...contatos];
    return [];
  }

  static async findById(id) {
    const lista = await this.findAll();
    return lista.find((item) => item.id === String(id)) ?? null;
  }

  static async save(contato) {
    const lista = await this.findAll();

    const index = lista.findIndex((item) => item.id === contato.id);

    if (index >= 0) {
      lista[index] = contato;
    } else {
      lista.push(contato);
    }

    contatos = lista;

    await this.saveAll(lista);

    return contato;
  }

  static async saveAll(lista) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
  }

  static async clear() {
    await AsyncStorage.removeItem(STORAGE_KEY);
    contatos = [];
  }
}