import { Product } from "@/app/types/product";

export function sortProducts(products: Product[], sortType: string): Product[] {
  const sorted = [...products];

  switch (sortType) {
    case "Preço: Menor para Maior":
      return sorted.sort(
        (product1, product2) => product1.originalPrice - product2.originalPrice,
      );
    case "Preço: Maior para Menor":
      return sorted.sort(
        (product1, product2) => product2.originalPrice - product1.originalPrice,
      );
    default:
      return sorted;
  }
}
