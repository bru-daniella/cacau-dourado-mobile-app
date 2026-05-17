import { getDatabase } from "../../DataBase";
import UsuarioEntity from "../entities/UsuarioEntity";

// O Serviço de Usuários é responsável por toda a comunicação com o banco de dados
// relacionado aos clientes (cadastro, login, busca).
export default class UsuarioService {
  
  // Guardamos qual usuário está logado atualmente no app
  static usuarioLogadoAtual = null;

  // Função para criar um usuário administrador padrão automaticamente
  static async initAdminUser() {
    try {
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
    } catch (e) {
      console.log("Erro ao inicializar admin: ", e);
    }
  }

  // Retorna quem é o usuário logado agora
  static getUsuarioLogado() {
    return this.usuarioLogadoAtual;
  }

  // Faz o logout do usuário
  static logout() {
    this.usuarioLogadoAtual = null;
  }

  // Busca todos os usuários cadastrados no banco
  static async findAll() {
    try {
      const db = await getDatabase();
      // Executa uma query no banco para selecionar tudo da tabela 'usuarios'
      const result = await db.getAllAsync("SELECT * FROM usuarios;");
      // Transforma os dados brutos do banco no formato que o app entende (UsuarioEntity)
      return result.map(item => UsuarioEntity.transforme(item));
    } catch (e) {
      console.log("Erro no findAll", e);
      return [];
    }
  }

  // Busca um usuário específico através do seu e-mail
  static async findByEmail(email) {
    try {
      const db = await getDatabase();
      // Executa uma query buscando onde o email seja igual ao que passamos
      const result = await db.getFirstAsync("SELECT * FROM usuarios WHERE email = ?;", [email]);
      // Se encontrar, converte para UsuarioEntity. Se não, retorna 'null' (vazio)
      return result ? UsuarioEntity.transforme(result) : null;
    } catch (e) {
      console.log("Erro no findByEmail", e);
      return null;
    }
  }

  // Salva ou atualiza um usuário no banco
  static async save(usuario) {
    try {
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
    } catch (e) {
      console.log("Erro ao salvar usuario: ", e);
      throw e;
    }
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
      this.usuarioLogadoAtual = usuario; // Salva o usuário na "sessão" do app
      return usuario;
    }
    
    // Caso contrário (não achou o e-mail ou a senha está errada), retorna nulo (login falhou)
    return null;
  }
}
