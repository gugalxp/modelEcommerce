import Product from "../types/Product";
import { products as initialProducts } from '../data/productsData';

const PRODUCTS_KEY = 'products';
const PRODUCTS_CART_KEY = 'products_cart';

export const getProductsFromStorage = (): Product[] => {
  const storedProducts = localStorage.getItem(PRODUCTS_KEY);
  return storedProducts ? JSON.parse(storedProducts) : [];
};

export const getProductsCartFromStorage = (): Product[] => {
  const storedProducts = localStorage.getItem(PRODUCTS_CART_KEY);
  return storedProducts ? JSON.parse(storedProducts) : [];
};

export const setProductsToStorage = (products: Product[]): void => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const setProductsCartToStorage = (products: Product[]): void => {
  localStorage.setItem(PRODUCTS_CART_KEY, JSON.stringify(products));
};

export const addToCart = (product: Product): void => {
  const cartItems = getProductsCartFromStorage();
  setProductsCartToStorage([...cartItems, product]);
};

export const removeFromCart = (productId: string): void => {
  const cartItems = getProductsCartFromStorage();
  const updatedCartItems = cartItems.filter(item => item.id !== productId);
  setProductsCartToStorage(updatedCartItems);
};

export const removeAllItemsCart = (): void => {
  localStorage.removeItem(PRODUCTS_CART_KEY);
};

export const updateCartItemQuantityInStorage = (itemId: string, newQuantity: number): void => {
  const cartItems = getProductsCartFromStorage();

  const updatedCartItemIndex = cartItems.findIndex(item => item.id === itemId);

  if (updatedCartItemIndex !== -1) {
    cartItems[updatedCartItemIndex].quantity = newQuantity;

    setProductsCartToStorage(cartItems);
  } else {
    console.error(`Item no carrinho com ID ${itemId} não encontrado no localStorage.`);
  }
};

export const initializeStorage = (): void => {
  const isStorageInitialized = localStorage.getItem('storageInitialized');

  if (!isStorageInitialized) {
    setProductsToStorage(initialProducts);
    localStorage.setItem('storageInitialized', 'true');
  }
};

initializeStorage();
