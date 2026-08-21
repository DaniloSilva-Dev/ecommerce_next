"use client";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Drawer, IconButton, Typography } from "@mui/material";
import { QuantityControl } from "./primitives/quantity_control";
import { useRouter } from "next/navigation";
import { useCartStore } from "src/hooks/use_cart_store";
import { Button } from "./primitives/button";

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
    (total, item) =>
      total + (item.discountedPrice ?? item.originalPrice) * item.quantity,
    0,
  );

  const itemsCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Drawer anchor="right" open={isOpen} onClose={toggleCart}>
      <Box
        sx={{
          width: { xs: "100vw", sm: 400 },
          maxWidth: "100vw",
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
            <Typography
              variant="h4"
              sx={{ fontSize: "2rem", fontWeight: "bold" }}
            >
              Seu Carrinho
            </Typography>
            {items.length > 0 && (
              <Typography variant="body1" sx={{ fontSize: "1.4rem" }}>
                {itemsCount} {itemsCount === 1 ? "item" : "itens"} prontos para
                finalizar a compra.
              </Typography>
            )}
          </Box>
          <IconButton onClick={toggleCart}>
            <CloseIcon />
          </IconButton>
        </Box>
        {items.length === 0 ? (
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.4rem",
              fontWeight: "bold",
              textAlign: "center",
              mt: 4,
            }}
          >
            Carrinho vazio, adicione itens no carrinho para finalizar a compra!
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
              {items.map((item) => {
                const finalPrice = item.discountedPrice ?? item.originalPrice;

                return (
                  <Box
                    key={item.productId}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "64px minmax(0, 1fr) auto",
                        sm: "80px minmax(0, 1fr) auto",
                      },
                      columnGap: { xs: 1, sm: 2 },
                      rowGap: { xs: 1, sm: 0 },
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "auto",
                          aspectRatio: "1",
                          objectFit: "cover",
                        }}
                      />
                    )}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        minWidth: 0,
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "1.4rem",
                          fontWeight: "bold",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "1.4rem",
                          color: "var(--primary-color)",
                        }}
                      >
                        {formatCurrency(finalPrice)}
                      </Typography>
                      <QuantityControl
                        quantity={item.quantity}
                        onDecrease={() => decreaseQuantity(item.productId)}
                        onIncrease={() => addItem(item)}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gridColumn: { xs: 3, sm: "auto" },
                        gridRow: { xs: 1, sm: "auto" },
                        justifyContent: "flex-end",
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => removeItem(item.productId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                );
              })}
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
