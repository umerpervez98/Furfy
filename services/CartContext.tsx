"use client"

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { getCartDetails, addToCart as apiAddToCart, updateCartQuantity, getProduct } from "@services/api";

interface CartState {
  cartItems: any[];
  subtotal: number;
  shippingFee: number;
  total: number;
  price: number;
  accessToken: string;
  product: any | null; 
}

const initialState: CartState = {
  cartItems: [],
  subtotal: 0,
  shippingFee: 0,
  total: 0,
  price: 0,
  accessToken: '',
  product: null
};

type Action =
  | { type: "SET_CART"; payload: CartState }
  | { type: "UPDATE_ITEM"; payload: { productId: string; qty: number } }
  | { type: "SET_PRODUCT"; payload: any };

const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case "SET_CART":
      return { ...state, ...action.payload };

    case "UPDATE_ITEM":
      return { ...state, ...action.payload };

    case "SET_PRODUCT":
      return { ...state, product: action.payload };

    default:
      return state;
  }
};

const CartContext = createContext<{
  cart: CartState;
  fetchCart: () => Promise<void>;
  fetchProduct: () => Promise<void>;
  addToCart: (quantity: number) => Promise<void>;
  updateItem: (productId: string, qty: number) => Promise<void>;
}>({
  cart: initialState,
  fetchCart: async () => {},
  fetchProduct: async () => {},
  addToCart: async () => {},
  updateItem: async () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const fetchCart = async () => {
    const response = await getCartDetails();
    if (response.success) {
      dispatch({ type: "SET_CART", payload: response.data });
    }
  };

  const fetchProduct = async () => {
    const { success, product } = await getProduct();
    if (success) {
      dispatch({ type: "SET_PRODUCT", payload: product });
    }
  };

  const addToCart = async (quantity: number) => {
    if (!cart.product) return;

    const response = await apiAddToCart(quantity, cart.product.accessToken);
    if (response.success) {
      await fetchCart(); // Refresh cart after adding product
    }
  };

  const updateItem = async (productId: string, qty: number) => {
    await updateCartQuantity(qty, productId);
    await fetchCart();
  };

  useEffect(() => {
    fetchCart();
    fetchProduct();
  }, []);

  return (
    <CartContext.Provider value={{ cart, fetchCart, fetchProduct, addToCart, updateItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
