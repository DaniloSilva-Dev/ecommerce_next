"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";

import { Product } from "@/app/types/product";
import { useCartStore } from "@/hooks/useCartStore";

interface CardProductsProps {
  product: Product;
}

export default function CardProducts({ product }: CardProductsProps) {
  const addItem = useCartStore((state) => state.addToCart);

  return (
    <Card
      sx={{
        maxWidth: 300,
        maxHeight: 400,
        borderRadius: 4,
        ":hover": {
          boxShadow: 6,
          borderColor: "primary.main",
          borderWidth: 1,
          borderStyle: "solid",
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrl}
        alt={product.name}
        sx={{ objectFit: "contain", p: 2 }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="overline"
          color="primary"
          sx={{ display: "block", mb: 1, fontWeight: "bold" }}
        >
          {product.category.join(" • ")}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography
          variant="h6"
          color="text.primary"
          sx={{ fontWeight: "bold" }}
        >
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(product.price / 100)}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          startIcon={<AddShoppingCart />}
          color="inherit"
          variant="contained"
          fullWidth
          sx={{
            textTransform: "none",
            fontWeight: 500,
            ":hover": { backgroundColor: "primary.main", color: "white" },
          }}
          onClick={() => addItem(product)}
        >
          Adicionar
        </Button>
      </CardActions>
    </Card>
  );
}
