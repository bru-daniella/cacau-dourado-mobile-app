import React, { createContext, useState, useContext } from 'react';

// 1. Criação do Contexto
// É como um "quadro de avisos" global para o carrinho de compras.
const CartContext = createContext();

// 2. Criação do Provedor do Contexto
// Este componente vai "abraçar" toda a nossa aplicação, garantindo que
// qualquer tela ou componente dentro dele possa acessar o carrinho.
export function CartProvider({ children }) {
  const [itens, setItens] = useState([]);

  // Função para adicionar um produto ao carrinho
  const adicionarAoCarrinho = (produto) => {
    // Usamos uma função no setItens para garantir que estamos sempre
    // trabalhando com a versão mais atualizada do carrinho.
    setItens(itensAtuais => {
      // Verifica se o produto já existe no carrinho
      const itemExistente = itensAtuais.find(item => item.id === produto.id);

      if (itemExistente) {
        // Se já existe, aumenta a quantidade
        return itensAtuais.map(item =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        // Se não existe, adiciona o produto com quantidade 1
        return [...itensAtuais, { ...produto, quantidade: 1 }];
      }
    });
  };

  // Função para remover um produto do carrinho
  const removerDoCarrinho = (produtoId) => {
    setItens(itensAtuais => 
      itensAtuais.filter(item => item.id !== produtoId)
    );
  };

  // O valor (value) é o que será compartilhado com os componentes filhos.
  // Disponibilizamos a lista de itens e as funções para modificá-la.
  const valorDoContexto = {
    itens,
    adicionarAoCarrinho,
    removerDoCarrinho,
  };

  return (
    <CartContext.Provider value={valorDoContexto}>
      {children}
    </CartContext.Provider>
  );
}

// 3. Hook customizado para facilitar o uso
// Em vez de importar `useContext` e `CartContext` em todo lugar,
// agora só precisamos importar `useCart`.
export function useCart() {
  return useContext(CartContext);
}
