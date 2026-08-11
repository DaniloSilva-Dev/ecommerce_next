import CartIndicator from "./cart_indicator";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Container } from "@mui/material";

import SearchBar from "./search_bar";

export default function Navbar() {
  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: "1px solid #e0e0e0",
        width: "100%",
        backgroundColor: "var(--neutral-color)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minHeight: 64,
          }}
        >
          {/* lado esquerdo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Link href="/" passHref style={{ textDecoration: "none" }}>
              <Typography
                variant="h6"
                color="primary"
                sx={{ fontWeight: "bold", letterSpacing: -0.5 }}
              >
                E-commerce
              </Typography>
            </Link>
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                flexGrow: 1,
                maxWidth: 200,
              }}
            >
              <SearchBar />
            </Box>
          </Box>

          {/* centro */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 4,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body2"
              color="text.primary"
              sx={{
                fontWeight: 600,
                borderBottom: "2px solid",
                borderColor: "primary.main",
                pb: 0.5,
                cursor: "pointer",
              }}
            >
              Loja
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontWeight: 500,
                pb: 0.5,
                cursor: "pointer",
                "&:hover": { color: "primary.main" },
              }}
            >
              Categorias
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontWeight: 500,
                pb: 0.5,
                cursor: "pointer",
                "&:hover": { color: "primary.main" },
              }}
            >
              Ofertas
            </Typography>
          </Box>

          {/* lado direito */}
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              className="Busca"
              size="small"
              sx={{ display: { xs: "inline-flex", md: "none" } }}
            >
              <SearchIcon />
            </IconButton>

            <CartIndicator aria-label="carrinho de compra" />

            <IconButton
              aria-label="login do usuário"
              size="small"
              sx={{
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              <PersonOutlineOutlinedIcon />
            </IconButton>

            <Link href="/checkout" passHref>
              <IconButton
                sx={{
                  textTransform: "none",
                  color: "white",
                  backgroundColor: "primary.main",
                  fontWeight: 500,
                  borderRadius: 1.5,
                  px: 3,
                  display: { xs: "none", md: "inline-flex" },
                }}
              >
                Checkout
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
