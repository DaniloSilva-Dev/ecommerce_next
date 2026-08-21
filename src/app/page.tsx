"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "src/components/navbar";
import type { Product } from "@/app/types/product";
import { CardProduct } from "@/components/card_products";
import { useCartStore } from "src/hooks/use_cart_store";
import { Button } from "src/components/primitives/button";
import { SortMenu } from "@/components/primitives/sort_menu";
import { sortProducts } from "@/utils/sort_products";
import { FilterDrawer } from "@/components/filter_drawer";
import { useFilterStore } from "src/hooks/use_filter_store";

const itemsMock: Product[] = [
  {
    productId: "1",
    name: "Headset Gamer HyperX Cloud III",
    originalPrice: 89990,
    imageUrl: "/headset.jfif",
    category: ["gamer", "periféricos"],
    isNew: true,
  },
  {
    productId: "2",
    name: "Teclado Mecânico RGB 60%",
    originalPrice: 45990,
    imageUrl: "/teclado_60.jfif",
    category: ["gamer", "periféricos"],
  },
  {
    productId: "3",
    name: "Mouse Gamer RGB 12.000 DPI",
    originalPrice: 22990,
    discountedPrice: 18990,
    imageUrl: "/mouse_gamer.jfif",
    category: ["gamer", "periféricos"],
  },
  {
    productId: "4",
    name: 'Monitor Gamer 27" 180 Hz',
    originalPrice: 169990,
    discountedPrice: 149990,
    imageUrl: "/monitor.jpg",
    category: ["gamer", "monitores"],
  },
  {
    productId: "5",
    name: "Cadeira Gamer Ergonômica",
    originalPrice: 129990,
    imageUrl: "/cadeira_ergonomica.jfif",
    category: ["gamer", "setup"],
  },
  {
    productId: "6",
    name: "Placa de Vídeo GeForce RTX 4060",
    originalPrice: 219990,
    imageUrl: "/placa_de_video.jfif",
    category: ["hardware", "gamer"],
  },
  {
    productId: "7",
    name: "Controle Sem Fio para PC e Console",
    originalPrice: 34990,
    imageUrl: "/controle.jfif",
    category: ["gamer", "acessórios"],
  },
  {
    productId: "8",
    name: "Microfone USB para Streaming",
    originalPrice: 59990,
    imageUrl: "/microfone.jfif",
    category: ["gamer", "streaming"],
  },
  {
    productId: "9",
    name: "Webcam Full HD com Microfone",
    originalPrice: 27990,
    imageUrl: "/webcam.jpg",
    category: ["streaming", "acessórios"],
  },
  {
    productId: "10",
    name: "SSD NVMe 1 TB PCIe 4.0",
    originalPrice: 57990,
    imageUrl: "/ssd.jpg",
    category: ["hardware", "componentes"],
  },
  {
    productId: "11",
    name: "Memória RAM 16 GB DDR5",
    originalPrice: 49990,
    imageUrl: "/memoria_ram.jfif",
    category: ["hardware", "componentes"],
  },
  {
    productId: "12",
    name: "Mousepad Desk Mat Extra Grande",
    originalPrice: 12990,
    imageUrl: "/mousepad.jpg",
    category: ["gamer", "setup"],
  },
  {
    productId: "13",
    name: "Ring Light LED para Lives",
    originalPrice: 15990,
    imageUrl: "/ring_light.jpg",
    category: ["streaming", "setup"],
  },
  {
    productId: "14",
    name: "Soundbar Compacta Bluetooth",
    originalPrice: 39990,
    imageUrl: "/soundbar.jfif",
    category: ["áudio", "acessórios"],
  },
  {
    productId: "15",
    name: 'Notebook Gamer 15" RTX 4050',
    originalPrice: 649990,
    discountedPrice: 599990,
    imageUrl: "/notebook_gamer.jpg",
    category: ["gamer", "hardware"],
  },
  {
    productId: "16",
    name: "Fone Bluetooth com Cancelamento de Ruído",
    originalPrice: 79990,
    imageUrl: "/fone_bluetooth.jfif",
    category: ["áudio", "acessórios"],
  },
];

export default function Home() {
  const searchParams = useSearchParams();
  const query = searchParams.get("search")?.toLowerCase() || "";

  const [sortType, setSortType] = useState("Padrão");
  const [visibleCount, setVisibleCount] = useState(8);
  const addItemToCart = useCartStore((state) => state.addToCart);

  const { selectedCategories } = useFilterStore();

  useEffect(() => {
    setVisibleCount(8);
  }, [query, selectedCategories]);

  // 1. Busca
  const searchedProducts = itemsMock.filter((item) =>
    item.name.toLowerCase().includes(query),
  );

  // 2. Filtro de Categorias
  const filteredByCategory = searchedProducts.filter((item) => {
    if (selectedCategories.length === 0) return true;

    // Retorna true se houver interseção entre as categorias do item e as selecionadas
    return item.category.some((cat) => selectedCategories.includes(cat));
  });

  // 3. Ordenação
  const sortedAndFilteredProducts = sortProducts(filteredByCategory, sortType);

  // 4. Paginação
  const visibleItems = sortedAndFilteredProducts.slice(0, visibleCount);
  const hasMoreItems = visibleCount < sortedAndFilteredProducts.length;

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
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "stretch", md: "flex-end" },
            justifyContent: "space-between",
            gap: { xs: 2, md: 0 },
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "flex-start", md: "flex-end" },
              justifyContent: "space-between",
              width: "100%",
              gap: { xs: 2, md: 0 },
            }}
          >
            <Box>
              <Typography variant="h3" sx={{ mb: 1, fontWeight: "bold" }}>
                Explore os produtos
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                style={{ fontSize: "1.8rem" }}
              >
                Encontre periféricos, hardware e acessórios para elevar seu
                setup.
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "stretch", md: "center" },
              gap: 2,
              width: { xs: "100%", md: "auto" },
              justifyContent: { xs: "flex-start", md: "flex-end" },
            }}
          >
            <FilterDrawer />
            <SortMenu selectedOption={sortType} onSelectOption={setSortType} />
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
