"use client";
import { Drawer, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "./primitives/button";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/hooks/useCartStore";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount / 100);
};

export default function CartDrawer() {
  const router = useRouter();
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

  const itemsCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Drawer anchor="right" open={isOpen} onClose={toggleCart}>
      <Box
        sx={{
          width: 400,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          bgcolor: "var(--neutral-color)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h4">Seu Carrinho</Typography>
            <Typography variant="body1" sx={{ fontSize: "1.4rem" }}>
              {itemsCount} {itemsCount === 1 ? "item" : "itens"} prontos para
              finalizar a compra.
            </Typography>
          </Box>
          <IconButton onClick={toggleCart}>
            <CloseIcon />
          </IconButton>
        </Box>
        {items.length === 0 ? (
          <Typography variant="body1" sx={{ fontSize: "1.4rem" }}>
            Seu carrinho está vazio.
          </Typography>
        ) : (
          <>
            <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                pr: 1,
                bgcolor: "var(--secondary-color)",
                p: 2,
                borderTop: "0.1rem solid #C7C4D8",
                borderBottom: "0.1rem solid #C7C4D8",
              }}
            >
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
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{
                        width: 80,
                        height: 80,
                        objectFit: "cover",
                        marginRight: "1rem",
                      }}
                    />
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "1.4rem", fontWeight: "bold" }}
                    >
                      {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "1.4rem" }}>
                      Preço: {formatCurrency(item.price)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        mr: 1,
                      }}
                    >
                      <IconButton
                        onClick={() => decreaseQuantity(item.productId)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: "1.4rem", fontWeight: "bold" }}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton onClick={() => addItem(item)}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <IconButton onClick={() => removeItem(item.productId)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 2,
                borderTop: "1px solid var(--neutral-color)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  mb: 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: "1.6rem", textAlign: "center" }}
                >
                  Subtotal:
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontSize: "2.4rem", fontWeight: "bold" }}
                >
                  {formatCurrency(subtotal)}
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{ fontSize: "1.4rem", textAlign: "center" }}
              >
                Frete e impostos calculados na finalização da compra.
              </Typography>
              <Button
                style={{ marginTop: "1rem", fontSize: "1.4rem", width: "100%" }}
                onClick={() => {
                  router.push("/checkout");
                  toggleCart();
                }}
              >
                Finalizar Compra
              </Button>
              <Button
                variant="secondary"
                style={{ marginTop: "1rem", fontSize: "1.4rem", width: "100%" }}
                onClick={clearCart}
              >
                Limpar Carrinho
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
}
