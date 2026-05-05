import AsyncStorage from "@react-native-async-storage/async-storage";
import UsuarioEntity from "../entities/UsuarioEntity";

const STORAGE_KEY = "@usuarios";

export default class UsuariosService {
  static async findAll() {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (json) {
      const lista = JSON.parse(json);
      return lista.map((item) => UsuarioEntity.transforme(item));
    }
    return [];
  }

  static async findByEmail(email) {
    const lista = await this.findAll();
    return lista.find((item) => item.email === email) ?? null;
  }

  static async save(usuario) {
    const lista = await this.findAll();
    const index = lista.findIndex((item) => item.id === usuario.id);

    if (index >= 0) {
      lista[index] = usuario;
    } else {
      lista.push(usuario);
    }

    await this.saveAll(lista);
    return usuario;
  }

  static async saveAll(lista) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
  }

  static async clear() {
    await AsyncStorage.removeItem(STORAGE_KEY);
  }

  static async login(email, senha) {
    const usuario = await this.findByEmail(email);
    if (usuario && usuario.senha === senha) {
      return usuario;
    }
    return null;
  }
}