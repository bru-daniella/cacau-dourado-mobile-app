// Dicionário central de imagens para mapear nomes do banco de dados para arquivos locais
const dicionarioDeImagens = {
  // Brigadeiros
  "brigadeiro-1": require("../../assets/images/products/brigadeiro-1.jpg"),
  "brigadeiro-2": require("../../assets/images/products/brigadeiro-2.jpg"),
  "brigadeiro-3": require("../../assets/images/products/brigadeiro-3.webp"),
  "brigadeiro-4": require("../../assets/images/products/brigadeiro-4.jpg"),
  "brig-pist-1": require("../../assets/images/products/brig-pist-1.jpg"),
  "brig-pist-2": require("../../assets/images/products/brig-pist-2.jpg"),
  "brig-pist-3": require("../../assets/images/products/brig-pist-3.jpg"),
  "brig-ninho-1": require("../../assets/images/products/brig-ninho-1.webp"),
  "brig-ninho-2": require("../../assets/images/products/brig-ninho-2.jpg"),
  "brig-amargo-1": require("../../assets/images/products/brig-amargo-1.jpg"),
  "brig-amargo-2": require("../../assets/images/products/brig-amargo-2.webp"),
  
  // Beijinhos
  "beijinho-1": require("../../assets/images/products/beijinho-1.jpg"),
  "beijinho-2": require("../../assets/images/products/beijinho-2.jpg"),
  "beijinho-3": require("../../assets/images/products/beijinho-3.jpg"),
  "bj-queimado-1": require("../../assets/images/products/bj-queimado-1.jpg"),
  "bj-queimado-2": require("../../assets/images/products/bj-queimado-2.jpg"),
  "bj-amendoa-1": require("../../assets/images/products/bj-amendoa-1.jpg"),
  "bj-amendoa-2": require("../../assets/images/products/bj-amendoa-2.jpg"),
  "bj-uva-1": require ("../../assets/images/products/bj-uva-1.webp"),
  "bj-uva-2": require ("../../assets/images/products/bj-uva-2.jpg"),

  // Brownies
  "brownie-1": require("../../assets/images/products/brownie-1.jpg"),
  "brownie-2": require("../../assets/images/products/brownie-2.jpg"),
  "brownie-3": require("../../assets/images/products/brownie-3.jpg"),
  "brownie-4": require("../../assets/images/products/brownie-4.jpg"),
  "brow-branco-1": require("../../assets/images/products/brow-branco-1.jpg"),
  "brow-branco-2": require("../../assets/images/products/brow-branco-2.jpg"),
  "brow-leite-1": require("../../assets/images/products/brow-leite-1.png"),
  "brow-leite-2": require("../../assets/images/products/brow-leite-2.png"),
  "brow-nozes-1": require("../../assets/images/products/brow-nozes-1.webp"),
  "brow-nozes-2": require("../../assets/images/products/brow-nozes-2.webp"),
};

/**
 * Retorna a fonte da imagem correta, seja local ou da web.
 * @param {string} nomeOuUrl - O nome da imagem (para mapeamento local) ou a URL completa.
 * @returns A fonte da imagem para ser usada no componente Image do React Native.
 */
export const obterImagem = (nomeOuUrl) => {
  if (dicionarioDeImagens[nomeOuUrl]) {
    return dicionarioDeImagens[nomeOuUrl];
  }
  if (typeof nomeOuUrl === "string" && nomeOuUrl.startsWith("http")) {
    return { uri: nomeOuUrl };
  }
  // Retorna uma imagem padrão caso não encontre a imagem
  return { uri: 'https://via.placeholder.com/150?text=Sem+Imagem' };
};
