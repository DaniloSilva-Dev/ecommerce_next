import { describe, expect, it } from "vitest";
import { getDiscountPercentage } from "@/utils/discount";
import { sortProducts } from "@/utils/sort_products";
import type { Product } from "@/app/types/product";

const products: Product[] = [
  {
    productId: "1",
    name: "Produto caro",
    originalPrice: 30000,
    imageUrl: "/caro.jpg",
    category: ["teste"],
  },
  {
    productId: "2",
    name: "Produto barato",
    originalPrice: 10000,
    imageUrl: "/barato.jpg",
    category: ["teste"],
  },
];

describe("getDiscountPercentage", () => {
  it("calcula o percentual de desconto e arredonda o resultado", () => {
    expect(getDiscountPercentage(7990, 10000)).toBe(20);
    expect(getDiscountPercentage(6666, 10000)).toBe(33);
  });

  it("retorna zero quando não existe desconto válido", () => {
    expect(getDiscountPercentage(10000, 10000)).toBe(0);
    expect(getDiscountPercentage(12000, 10000)).toBe(0);
    expect(getDiscountPercentage(10000)).toBe(0);
  });
});

describe("sortProducts", () => {
  it("ordena por preço crescente e não altera a lista original", () => {
    const sorted = sortProducts(products, "Preço: Menor para Maior");

    expect(sorted.map((product) => product.productId)).toEqual(["2", "1"]);
    expect(products.map((product) => product.productId)).toEqual(["1", "2"]);
  });

  it("ordena por preço decrescente", () => {
    const sorted = sortProducts(products, "Preço: Maior para Menor");

    expect(sorted.map((product) => product.productId)).toEqual(["1", "2"]);
  });

  it("preserva a ordem no modo padrão", () => {
    expect(sortProducts(products, "Padrão")).toEqual(products);
  });
});
