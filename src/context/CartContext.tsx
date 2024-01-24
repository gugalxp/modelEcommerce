import React, { createContext, useContext, ReactNode, useState } from 'react';
import Product from '../types/Product';
import { getProductsCartFromStorage, removeFromCart, removeAllItemsCart } from '../utils/localStorageUtils';

interface CartContextProps {
  products: Product[];
  getProductsCart: () => void;
  removeItemCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(getProductsCartFromStorage());

  const getProductsCart = () => {
    setProducts(getProductsCartFromStorage());
  };

  const removeItemCart = (id : string) => {
    removeFromCart(id);
  };

  const clearCart = () => {
    removeAllItemsCart();
  };

  return (
    <CartContext.Provider value={{ products, getProductsCart, removeItemCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser utilizado dentro de um CartProvider');
  }
  return context;
};
