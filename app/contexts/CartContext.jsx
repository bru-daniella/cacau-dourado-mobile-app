import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext();

function converterPrecoParaNumero(preco) {
  if (typeof preco === "number") {
    return preco;
  }

  if (!preco) {
    return 0;
  }

  return Number(String(preco).replace("R$", "").replace(".", "").replace(",", ".").trim()) || 0;
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    setCartItems((itensAtuais) => {
      const itemExistente = itensAtuais.find((item) => String(item.id) === String(produto.id));

      if (itemExistente) {
        return itensAtuais.map((item) =>
          String(item.id) === String(produto.id)
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      return [...itensAtuais, { ...produto, quantidade: 1 }];
    });
  };

  const diminuirQuantidade = (produtoId) => {
    setCartItems((itensAtuais) =>
      itensAtuais
        .map((item) =>
          String(item.id) === String(produtoId)
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  };

  const removerDoCarrinho = (produtoId) => {
    setCartItems((itensAtuais) =>
      itensAtuais.filter((item) => String(item.id) !== String(produtoId))
    );
  };

  const limparCarrinho = () => {
    setCartItems([]);
  };

  const quantidadeTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantidade, 0);
  }, [cartItems]);

  const valorTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + converterPrecoParaNumero(item.preco) * item.quantidade;
    }, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        adicionarAoCarrinho,
        diminuirQuantidade,
        removerDoCarrinho,
        limparCarrinho,
        quantidadeTotal,
        valorTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};