import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const adicionarAoCarrinho = (item) => {
    setCartItems(prevItems => [...prevItems, item]);
  };

  return (
    <CartContext.Provider value={{ cartItems, adicionarAoCarrinho }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
