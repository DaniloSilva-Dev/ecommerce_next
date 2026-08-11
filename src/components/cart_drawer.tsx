"use client";
import { Drawer, Box, Typography, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";

import { useCartStore } from "@/hooks/useCartStore";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount / 100);
};

export default function CartDrawer() {
  const {
    cartItems: items,
    isOpen,
    toggleCart,
    addToCart: addItem,
    removeFromCart: removeItem,
    decreaseQuantity,
    clearCart,
  } = useCartStore();

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <Drawer anchor="right" open={isOpen} onClose={toggleCart}>
      <Box sx={{ width: 400, p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">Carrinho</Typography>
          <IconButton onClick={toggleCart}>
            <CloseIcon />
          </IconButton>
        </Box>
        {items.length === 0 ? (
          <Typography variant="body1">Seu carrinho está vazio.</Typography>
        ) : (
          <>
            {items.map((item) => (
              <Box
                key={item.productId}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Box>
                  <Typography variant="body1">{item.name}</Typography>
                  <Typography variant="body2">
                    Preço: {formatCurrency(item.price)}
                  </Typography>
                  <Typography variant="body2">
                    Quantidade: {item.quantity}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton onClick={() => decreaseQuantity(item.productId)}>
                    <RemoveIcon />
                  </IconButton>
                  <IconButton onClick={() => addItem(item)}>
                    <AddIcon />
                  </IconButton>
                  <IconButton onClick={() => removeItem(item.productId)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
            <Typography variant="h6">
              Subtotal: {formatCurrency(subtotal)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              component={Link}
              href="/checkout"
            >
              Finalizar Compra
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{ mt: 1 }}
              onClick={clearCart}
            >
              Limpar Carrinho
            </Button>
          </>
        )}
      </Box>
    </Drawer>
  );
}
