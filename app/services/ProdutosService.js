import { getDatabase } from "../../DataBase";
import ProdutoEntity from "../entities/ProdutoEntity";

// Lista de produtos iniciais para popular o banco de dados na primeira vez que o app rodar.
// AGORA USANDO OS NOMES DAS IMAGENS LOCAIS QUE FORAM ATUALIZADAS NO DICIONÁRIO
const produtosIniciais = [
  new ProdutoEntity(
    "1",
    "Brigadeiro",
    "5,99",
    "Um doce para adoçar seu dia! O brigadeiro é um clássico brasileiro feito com leite condensado, chocolate em pó, manteiga e granulado de chocolate.",
    JSON.stringify([
      "brigadeiro-1", 
      "brigadeiro-2",
      "brigadeiro-3",
      "brigadeiro-4"
    ]),
    "Brigadeiro"
  ),
  new ProdutoEntity(
    "2",
    "Beijinho",
    "5,99",
    "Um doce para adoçar seu dia! O beijinho é um clássico brasileiro feito com leite condensado, coco ralado e manteiga.",
    JSON.stringify([
      "beijinho-1",
      "beijinho-2",
      "beijinho-3",
    ]),
    "Beijinho"
  ),
  new ProdutoEntity(
    "3",
    "Brownie",
    "12,99",
    "Um doce para adoçar seu dia! O brownie é um clássico americano feito com chocolate, farinha, ovos e açúcar. Textura macia e sabor intenso.",
    JSON.stringify([
      "brownie-1",
      "brownie-2",
      "brownie-3",
      "brownie-4",
    ]),
    "Brownie"
  ),
];

// O Serviço de Produtos é responsável por toda a comunicação com o banco de dados
// relacionado aos produtos da loja.
export default class ProdutosService {
  
  // Função para popular o banco com dados iniciais se ele estiver vazio
  static async popularDadosIniciais() {
    const db = await getDatabase();
    // Conta quantos produtos já existem na tabela
    const resultado = await db.getAllAsync("SELECT COUNT(*) as count FROM produtos;");
    
    // Se a contagem for 0, significa que a tabela está vazia
    if (resultado[0].count === 0) {
      console.log("Populando o banco de dados com produtos iniciais...");
      // Percorre a lista de produtos iniciais e salva um por um no banco
      for (const produto of produtosIniciais) {
        await this.save(produto);
      }
    }
  }

  // Busca todos os produtos cadastrados no banco
  static async findAll() {
    await this.popularDadosIniciais(); // Garante que o banco tenha dados antes de buscar
    const db = await getDatabase();
    const resultado = await db.getAllAsync("SELECT * FROM produtos;");
    return resultado.map(item => ProdutoEntity.transforme(item));
  }

  // Busca um produto específico pelo seu ID
  static async findById(id) {
    const db = await getDatabase();
    const resultado = await db.getFirstAsync("SELECT * FROM produtos WHERE id = ?;", [String(id)]);
    return resultado ? ProdutoEntity.transforme(resultado) : null;
  }

  // Salva ou atualiza um produto no banco
  static async save(produto) {
    const db = await getDatabase();
    
    const existe = await db.getFirstAsync("SELECT id FROM produtos WHERE id = ?;", [produto.id]);

    if (existe) {
      await db.runAsync(
        "UPDATE produtos SET nome = ?, preco = ?, descricao = ?, imagem = ?, categoria = ? WHERE id = ?;",
        [produto.nome, produto.preco, produto.descricao, produto.imagem, produto.categoria, produto.id]
      );
    } else {
      await db.runAsync(
        "INSERT INTO produtos (id, nome, preco, descricao, imagem, categoria) VALUES (?, ?, ?, ?, ?, ?);",
        [produto.id, produto.nome, produto.preco, produto.descricao, produto.imagem, produto.categoria]
      );
    }

    return produto;
  }

  // Apaga todos os produtos da tabela
  static async clear() {
    const db = await getDatabase();
    await db.execAsync("DELETE FROM produtos;");
  }
}
