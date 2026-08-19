import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/app/types/product";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
  isOpen: boolean;
  toggleCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      cartItems: [],
      addToCart: (product) => {
        console.log("addToCart");
        set((state) => {
          const existingItem = state.cartItems.find(
            (item) => item.productId === product.productId,
          );
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.productId === product.productId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }
          return {
            cartItems: [...state.cartItems, { ...product, quantity: 1 }],
          };
        });
      },
      decreaseQuantity: (productId: string) => {
        set((state) => {
          const existingItem = state.cartItems.find(
            (item) => item.productId === productId,
          );
          if (existingItem && existingItem.quantity > 1) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item,
              ),
            };
          } else {
            return {
              cartItems: state.cartItems.filter(
                (item) => item.productId !== productId,
              ),
            };
          }
        });
      },
      removeFromCart: (productId) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => item.productId !== productId,
          ),
        })),
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage",
    },
  ),
);
