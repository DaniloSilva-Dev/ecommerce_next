"use client";
import { useState, useEffect } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge, Box, IconButton } from "@mui/material";

import { useCartStore } from "@/hooks/useCartStore";
import CartDrawer from "@/components/cart_drawer";

export default function CartIndicator() {
  const [isMounted, setIsMounted] = useState(false);
  const { cartItems: items, toggleCart } = useCartStore();
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <IconButton
        size="large"
        sx={{
          color: "text.secondary",
          "&:hover": { color: "primary.main" },
        }}
      >
        <Badge color="primary">
          <ShoppingCartOutlinedIcon />
        </Badge>
      </IconButton>
    );
  }

  return (
    <Box>
      <IconButton
        size="large"
        onClick={toggleCart}
        sx={{
          color: "text.secondary",
          "&:hover": { color: "primary.main" },
        }}
      >
        <Badge
          badgeContent={totalItems}
          color="primary"
          showZero
          sx={{
            "& .MuiBadge-badge": {
              fontSize: "1.2rem",
              height: "1.8rem",
              minWidth: "1.8rem",
            },
          }}
        >
          <ShoppingCartOutlinedIcon fontSize="large" />
        </Badge>
      </IconButton>

      <CartDrawer />
    </Box>
  );
}
