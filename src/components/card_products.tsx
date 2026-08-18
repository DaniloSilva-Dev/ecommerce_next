"use client";

import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import { Card } from "@/components/primitives/card";
import { Button } from "@/components/primitives/button";

import type { Product } from "@/app/types/product";
import { useCartStore } from "@/hooks/useCartStore";

interface CardProductsProps {
  product: Product;
  onClick: (product: Product) => void;
}

export function CardProduct({ product, onClick }: CardProductsProps) {
  // const addItem = useCartStore((state) => state.addToCart);
  const hasDiscount = product.isOffer;

  return (
    <Card>
      <Card.Image src={product.imageUrl} alt={product.name} />
      <Card.Body>
        <span>{product.category.join(" • ")}</span>
        <h3>{product.name}</h3>
        <span>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(product.price / 100)}
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
          <AddShoppingCart fontSize="small" />
          Adicionar
        </Button>
      </Card.Footer>
    </Card>
  );
}
