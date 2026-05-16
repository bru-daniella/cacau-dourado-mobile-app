import { getDatabase } from "../../DataBase";
import UsuarioEntity from "../entities/UsuarioEntity";

// O Serviço de Usuários é responsável por toda a comunicação com o banco de dados
// relacionado aos clientes (cadastro, login, busca).
export default class UsuarioService {
  
  // Função para criar um usuário administrador padrão automaticamente
  static async initAdminUser() {
    const adminEmail = "admin@cacaudourado.com";
    const adminUser = await this.findByEmail(adminEmail);

    // Se o admin não existir, nós o criamos
    if (!adminUser) {
      const novoAdmin = new UsuarioEntity(
        "admin-1234", 
        "Administrador", 
        adminEmail, 
        "admin123"
      );
      await this.save(novoAdmin);
      console.log("Usuário ADMIN criado com sucesso.");
    }
  }

  // Busca todos os usuários cadastrados no banco
  static async findAll() {
    const db = await getDatabase();
    // Executa uma query no banco para selecionar tudo da tabela 'usuarios'
    const result = await db.getAllAsync("SELECT * FROM usuarios;");
    // Transforma os dados brutos do banco no formato que o app entende (UsuarioEntity)
    return result.map(item => UsuarioEntity.transforme(item));
  }

  // Busca um usuário específico através do seu e-mail
  static async findByEmail(email) {
    const db = await getDatabase();
    // Executa uma query buscando onde o email seja igual ao que passamos
    const result = await db.getFirstAsync("SELECT * FROM usuarios WHERE email = ?;", [email]);
    // Se encontrar, converte para UsuarioEntity. Se não, retorna 'null' (vazio)
    return result ? UsuarioEntity.transforme(result) : null;
  }

  // Salva ou atualiza um usuário no banco
  static async save(usuario) {
    const db = await getDatabase();
    
    // 1. Verifica se já existe um usuário com este ID no banco
    const existe = await db.getFirstAsync("SELECT id FROM usuarios WHERE id = ?;", [usuario.id]);

    // 2. Se já existe, nós o atualizamos (UPDATE)
    if (existe) {
      await db.runAsync(
        "UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?;",
        [usuario.nome, usuario.email, usuario.senha, usuario.id]
      );
    // 3. Se não existe, nós o criamos (INSERT)
    } else {
      await db.runAsync(
        "INSERT INTO usuarios (id, nome, email, senha) VALUES (?, ?, ?, ?);",
        [usuario.id, usuario.nome, usuario.email, usuario.senha]
      );
    }

    return usuario;
  }

  // Apaga todos os usuários (Usado mais para testes)
  static async clear() {
    const db = await getDatabase();
    await db.execAsync("DELETE FROM usuarios;");
  }

  // Tenta realizar o login com email e senha
  static async login(email, senha) {
    await this.initAdminUser(); // Garante que o admin exista antes de qualquer tentativa

    // Busca o usuário pelo e-mail
    const usuario = await this.findByEmail(email);
    
    // Se encontrar o usuário E a senha informada for igual à senha salva no banco, o login é autorizado
    if (usuario && usuario.senha === senha) {
      return usuario;
    }
    
    // Caso contrário (não achou o e-mail ou a senha está errada), retorna nulo (login falhou)
    return null;
  }
}
