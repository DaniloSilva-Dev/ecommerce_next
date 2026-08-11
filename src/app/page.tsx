import CardProducts from "@/components/card_products";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Navbar from "src/components/navbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

export default function Home() {
  const itemsMock = [
    {
      productId: "1",
      name: "Produto 1",
      price: 1000,
      imageUrl: "/headset.jpg",
      category: ["headset", "tecnologia", "perifericos"],
    },
    {
      productId: "2",
      name: "Produto 2",
      price: 2299,
      imageUrl: "/memoria_ram.webp",
      category: ["memoria", "tecnologia", "hardware"],
    },
    {
      productId: "3",
      name: "Produto 3",
      price: 3550,
      imageUrl: "/mouse_gamer.jpg",
      category: ["mouse", "tecnologia", "perifericos"],
    },
    {
      productId: "4",
      name: "Produto 4",
      price: 2450,
      imageUrl: "/teclado_mecanico.webp",
      category: ["teclado", "tecnologia", "perifericos"],
    },
    {
      productId: "5",
      name: "Produto 5",
      price: 1000,
      imageUrl: "/headset.jpg",
      category: ["headset", "tecnologia", "perifericos"],
    },
    {
      productId: "6",
      name: "Produto 6",
      price: 2299,
      imageUrl: "/memoria_ram.webp",
      category: ["memoria", "tecnologia", "hardware"],
    },
    {
      productId: "7",
      name: "Produto 7",
      price: 3550,
      imageUrl: "/mouse_gamer.jpg",
      category: ["mouse", "tecnologia", "perifericos"],
    },
    {
      productId: "8",
      name: "Produto 8",
      price: 2450,
      imageUrl: "/teclado_mecanico.webp",
      category: ["teclado", "tecnologia", "perifericos"],
    },
  ];
  return (
    <>
      {console.log("renderizou")}
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
              Explore os produtos
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Confira os produtos mais recentes e populares em nossa loja.
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2} sx={{ p: 2 }}>
          {itemsMock.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.productId}>
              <CardProducts product={item} />
            </Grid>
          ))}
        </Grid>

        <Button
          variant="outlined"
          color="secondary"
          sx={{
            mt: 4,
            display: "block",
            borderRadius: 2,
            mx: "auto",
            ":hover": {
              backgroundColor: "neutral.main",
              borderColor: "primary.main",
            },
          }}
        >
          Carregar mais produtos
        </Button>
      </Container>
    </>
  );
}
