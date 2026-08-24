import { beforeEach, describe, expect, it } from "vitest";
import { useCartStore } from "@/hooks/use_cart_store";
import type { Product } from "@/app/types/product";

const product: Product = {
  productId: "1",
  name: "Produto de teste",
  originalPrice: 10000,
  imageUrl: "/produto.jpg",
  category: ["teste"],
};

beforeEach(() => {
  useCartStore.setState({ cartItems: [], isOpen: false });
  localStorage.clear();
});

describe("useCartStore", () => {
  it("adiciona um produto e incrementa a quantidade ao adicioná-lo novamente", () => {
    const { addToCart } = useCartStore.getState();

    addToCart(product);
    addToCart(product);

    expect(useCartStore.getState().cartItems).toEqual([
      { ...product, quantity: 2 },
    ]);
  });

  it("remove o item quando a quantidade chega a um", () => {
    const { addToCart, decreaseQuantity } = useCartStore.getState();

    addToCart(product);
    decreaseQuantity(product.productId);

    expect(useCartStore.getState().cartItems).toEqual([]);
  });

  it("decrementa a quantidade sem remover quando há mais de uma unidade", () => {
    const { addToCart, decreaseQuantity } = useCartStore.getState();

    addToCart(product);
    addToCart(product);
    decreaseQuantity(product.productId);

    expect(useCartStore.getState().cartItems[0].quantity).toBe(1);
  });

  it("remove itens e limpa o carrinho", () => {
    const secondProduct = { ...product, productId: "2" };
    const { addToCart, removeFromCart, clearCart } = useCartStore.getState();

    addToCart(product);
    addToCart(secondProduct);
    removeFromCart(product.productId);

    expect(useCartStore.getState().cartItems).toEqual([
      { ...secondProduct, quantity: 1 },
    ]);

    clearCart();
    expect(useCartStore.getState().cartItems).toEqual([]);
  });

  it("alterna a abertura do carrinho", () => {
    const { toggleCart } = useCartStore.getState();

    toggleCart();
    expect(useCartStore.getState().isOpen).toBe(true);

    toggleCart();
    expect(useCartStore.getState().isOpen).toBe(false);
  });
});
