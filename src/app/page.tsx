"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "src/components/navbar";
import { Card } from "src/components/primitives/card";
import type { Product } from "@/app/types/product";
import { CardProduct } from "@/components/card_products";
import { useCartStore } from "@/hooks/useCartStore";
import { Button } from "src/components/primitives/button";
import { AddShoppingCart } from "@mui/icons-material";
const itemsMock: Product[] = [
  {
    productId: "1",
    name: "Ingresso Festival Som & Arte",
    price: 1000,
    imageUrl: "/ingresso.avif",
    category: ["ingresso", "evento"],
    isOffer: false,
  },
  {
    productId: "2",
    name: "Curso de JavaScript Moderno",
    price: 2299,
    imageUrl: "/java.png",
    category: ["curso", "programação"],
    isOffer: true,
  },
  {
    productId: "3",
    name: "Licença Editor Pro - 1 ano",
    price: 3550,
    imageUrl: "/editor.png",
    category: ["licença", "software"],
    isOffer: true,
  },
  {
    productId: "4",
    name: "Workshop de Fotografia Criativa",
    price: 2450,
    imageUrl: "/workshop.jpg",
    category: ["curso", "workshop"],
    isOffer: false,
  },
  {
    productId: "5",
    name: "Ingresso Teatro: A Última Sessão",
    price: 1899,
    imageUrl: "/ingresso.avif",
    category: ["ingresso", "teatro"],
    isOffer: false,
  },
  {
    productId: "6",
    name: "Licença Suite Design Essencial",
    price: 4199,
    imageUrl: "/java.png",
    category: ["licença", "design"],
    isOffer: false,
  },
  {
    productId: "7",
    name: "Curso de Marketing Digital",
    price: 2799,
    imageUrl: "/editor.png",
    category: ["curso", "marketing"],
    isOffer: false,
  },
  {
    productId: "8",
    name: "Ingresso Conferência Dev Brasil",
    price: 3199,
    imageUrl: "/workshop.jpg",
    category: ["ingresso", "conferência"],
    isOffer: false,
  },
  {
    productId: "9",
    name: "Licença Antivírus Premium",
    price: 4599,
    imageUrl: "/ingresso.avif",
    category: ["licença", "segurança"],
    isOffer: false,
  },
  {
    productId: "10",
    name: "Curso de UX e Pesquisa de Usuários",
    price: 2899,
    imageUrl: "/java.png",
    category: ["curso", "design"],
    isOffer: false,
  },
  {
    productId: "11",
    name: "Ingresso Passeio Cultural Histórico",
    price: 2199,
    imageUrl: "/editor.png",
    category: ["ingresso", "cultura"],
    isOffer: false,
  },
  {
    productId: "12",
    name: "Licença Ferramenta de Produtividade",
    price: 3799,
    imageUrl: "/workshop.jpg",
    category: ["licença", "produtividade"],
    isOffer: false,
  },
  {
    productId: "13",
    name: "Curso de Fotografia com Celular",
    price: 3299,
    imageUrl: "/ingresso.avif",
    category: ["curso", "fotografia"],
    isOffer: false,
  },
  {
    productId: "14",
    name: "Ingresso Festival Gastronômico",
    price: 4999,
    imageUrl: "/java.png",
    category: ["ingresso", "gastronomia"],
    isOffer: true,
  },
  {
    productId: "15",
    name: "Licença Plataforma de Música - 1 ano",
    price: 2499,
    imageUrl: "/editor.png",
    category: ["licença", "música"],
    isOffer: false,
  },
  {
    productId: "16",
    name: "Curso de Finanças Pessoais",
    price: 4299,
    imageUrl: "/workshop.jpg",
    category: ["curso", "finanças"],
    isOffer: false,
  },
];

export default function Home() {
  const searchParams = useSearchParams();
  const query = searchParams.get("search")?.toLowerCase() || "";

  const addItemToCart = useCartStore((state) => state.addToCart);

  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    setVisibleCount(8); // Reset visible count when search query changes
  }, [query]);

  const filteredProducts = itemsMock.filter((item) =>
    item.name.toLowerCase().includes(query),
  );

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const visibleItems = filteredProducts.slice(0, visibleCount);
  const hasMoreItems = visibleCount < filteredProducts.length;

  const handleAddProductToCheckout = (product: Product) => {
    addItemToCart(product);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 2, mb: 8, borderRadius: 4, p: 2 }}>
        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Box>
            <Typography variant="h3" sx={{ mb: 1, fontWeight: "bold" }}>
              Explore os produtos digitais
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              style={{ fontSize: "1.8rem" }}
            >
              Ingressos, licenças e cursos entregues diretamente por email.
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2} sx={{ p: 2 }}>
          {visibleItems.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.productId}>
              <CardProduct
                product={item}
                onClick={handleAddProductToCheckout}
              />
            </Grid>
          ))}
        </Grid>

        {hasMoreItems && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="tertiary"
              onClick={() => setVisibleCount((current) => current + 4)}
            >
              Carregar mais produtos
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
}
