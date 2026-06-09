import { getDatabase } from "../../DataBase";
import ProdutoEntity from "../entities/ProdutoEntity";

// Lista de produtos iniciais para popular o banco de dados na primeira vez que o app rodar.
const produtosIniciais = [
  // ================= BRIGADEIROS =================
  new ProdutoEntity(
    "1",
    "Brigadeiro Tradicional",
    "5,99",
    "O clássico irresistível feito com leite condensado e chocolate em pó 50% cacau, coberto com granulado belga.",
    JSON.stringify([
        "brigadeiro-1",
        "brigadeiro-2",
        "brigadeiro-3"
        ]),
    "Brigadeiro"
  ),
  new ProdutoEntity(
    "101",
    "Brigadeiro de Pistache",
    "8,50",
    "Uma versão sofisticada do clássico, feita com pasta pura de pistache italiana e envolta em pistaches triturados.",
    JSON.stringify([
        "brig-pist-1",
        "brig-pist-2",
        "brig-pist-3"
    ]),
    "Brigadeiro"
  ),
  new ProdutoEntity(
    "102",
    "Brigadeiro de Ninho",
    "6,50",
    "Brigadeiro cremoso de leite Ninho, uma explosão de sabor e cremosidade a cada mordida.",
    JSON.stringify(["brig-ninho-1", "brig-ninho-2"]),
    "Brigadeiro"
  ),
  new ProdutoEntity(
    "103",
    "Brigadeiro Meio Amargo",
    "6,99",
    "Para quem ama um sabor mais intenso: brigadeiro feito com cacau 70% e coberto com splits de chocolate amargo.",
    JSON.stringify([
        "brig-amargo-1",
        "brig-amargo-2"
    ]),
    "Brigadeiro"
  ),

  // ================= BEIJINHOS =================
  new ProdutoEntity(
    "2",
    "Beijinho Tradicional",
    "5,99",
    "O docinho que não pode faltar, feito com muito coco ralado fresco e leite condensado.",
    JSON.stringify(["beijinho-1", "beijinho-2"]),
    "Beijinho"
  ),
  new ProdutoEntity(
    "201",
    "Beijinho com Uva",
    "7,50",
    "O clássico beijinho envolvendo uma suculenta uva verde sem semente (Surpresa de Uva).",
    JSON.stringify([
        "bj-uva-1",
        "bj-uva-2"
    ]),
    "Beijinho"
  ),
  new ProdutoEntity(
    "202",
    "Beijinho de Coco Queimado",
    "6,50",
    "Uma variação deliciosa com coco levemente tostado, trazendo um sabor caramelizado incrível.",
    JSON.stringify(["" +
      "bj-queimado-1",
      "bj-queimado-2"
    ]),
    "Beijinho"
  ),
  new ProdutoEntity(
    "203",
    "Beijinho com Amêndoas",
    "8,00",
    "Beijinho cremoso envolvido em lascas de amêndoas torradas, textura e sabor únicos.",
    JSON.stringify(["bj-amendoa-1", "bj-amendoa-2"]),
    "Beijinho"
  ),

  // ================= BROWNIES =================
  new ProdutoEntity(
    "3",
    "Brownie Clássico",
    "12,99",
    "O verdadeiro brownie americano: casquinha crocante por fora e muito denso e achocolatado por dentro.",
    JSON.stringify(["brownie-1", "brownie-2"]),
    "Brownie"
  ),
  new ProdutoEntity(
    "301",
    "Brownie com Nozes",
    "14,50",
    "O brownie clássico elevado a outro nível com pedaços crocantes de nozes pecan misturados à massa.",
    JSON.stringify(["brow-nozes-1", "brow-nozes-2"]),
    "Brownie"
  ),
  new ProdutoEntity(
    "302",
    "Brownie Recheado de Doce de Leite",
    "16,00",
    "Nosso brownie tradicional generosamente recheado com doce de leite artesanal argentino.",
    JSON.stringify(["brow-leite-1", "brow-leite-2"]),
    "Brownie"
  ),
  new ProdutoEntity(
    "303",
    "Blondie (Brownie de Chocolate Branco)",
    "13,50",
    "A versão 'loira' do brownie, feita com chocolate branco nobre, baunilha e gotas de chocolate amargo.",
    JSON.stringify(["brow-branco-1", "brow-branco-2"]),
    "Brownie"
  ),
];

export default class ProdutosService {
  
  static async popularDadosIniciais() {
    const db = await getDatabase();
    const resultado = await db.getAllAsync("SELECT COUNT(*) as count FROM produtos;");
    
    if (resultado[0].count === 0) {
      console.log("Populando o banco de dados com produtos iniciais...");
      for (const produto of produtosIniciais) {
        await this.save(produto);
      }
    }
  }

  static async findAll() {
    await this.popularDadosIniciais(); 
    const db = await getDatabase();
    const resultado = await db.getAllAsync("SELECT * FROM produtos;");
    return resultado.map(item => ProdutoEntity.transforme(item));
  }

  static async findById(id) {
    const db = await getDatabase();
    const resultado = await db.getFirstAsync("SELECT * FROM produtos WHERE id = ?;", [String(id)]);
    return resultado ? ProdutoEntity.transforme(resultado) : null;
  }

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

  static async clear() {
    const db = await getDatabase();
    await db.execAsync("DELETE FROM produtos;");
  }
}
