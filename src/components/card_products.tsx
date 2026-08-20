"use client";

import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import { Card } from "@/components/primitives/card";
import { Button } from "@/components/primitives/button";
import type { Product } from "@/app/types/product";
import { Tag } from "@/components/primitives/tag";
import { getDiscountPercentage } from "src/utils/discount";

interface CardProductsProps {
  product: Product;
  onClick: (product: Product) => void;
}

export function CardProduct({ product, onClick }: CardProductsProps) {
  // const addItem = useCartStore((state) => state.addToCart);;
  const discountPercentage = getDiscountPercentage(
    product.discountedPrice ?? 0,
    product.originalPrice,
  );
  const finalPrice = product.discountedPrice ?? product.originalPrice;
  return (
    <Card>
      <Card.Image src={product.imageUrl} alt={product.name} />
      {product.isNew && <Tag variant="new">NOVO</Tag>}
      {product.discountedPrice && (
        <Tag variant="offer">-{discountPercentage}%</Tag>
      )}
      <Card.Body>
        <span
          style={{
            fontSize: "1.2rem",
            color: "var(--primary-color)",
            fontWeight: "bold",
          }}
        >
          {" "}
          {product.category.join(" • ")}
        </span>
        <h3 style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
          {product.name}
        </h3>
        <span style={{ fontSize: "1.6rem", fontWeight: "bold" }}>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(finalPrice / 100)}
        </span>
      </Card.Body>

      <Card.Footer>
        <Button
          variant="secondary"
          onClick={(e) => {
            e.stopPropagation();
            onClick(product);
          }}
        >
          <AddShoppingCart fontSize="large" />
          Adicionar
        </Button>
      </Card.Footer>
    </Card>
  );
}
