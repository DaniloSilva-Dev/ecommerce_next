"use client";

import { Box, Typography, Button, Paper } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Link from "next/link";

export default function Conclusao() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Pedido realizado com sucesso!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Obrigado por sua compra. Seu pedido está sendo processado.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/"
          sx={{ mt: 2 }}
        >
          Voltar para a loja
        </Button>
      </Paper>
    </Box>
  );
}
