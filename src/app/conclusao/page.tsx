"use client";

import { Box, Typography, Button, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/components/navigation";
import { CheckCircle } from "@mui/icons-material";

export default function Conclusao() {
  const [order, setOrder] = useState<any>(null);
  const [isPaid, setIsPaid] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const orderData = sessionStorage.getItem("lastOrder");
    if (orderData) {
      setOrder(JSON.parse(orderData));
    }
  }, []);

  const isPix = Boolean(order?.qr_codes?.length > 0);
  const pixText = isPix ? order.qr_codes[0].text : "";
  const pixImage = isPix
    ? order.qr_codes[0].links.find((link: any) => link.rel === "QRCODE.PNG")
        ?.href
    : "";

  useEffect(() => {
    if (!order) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/order_status?id=${order.id}`);
        const updateOrder = await res.json();

        const status = updateOrder.charges?.[0]?.status;

        if (status === "PAID") {
          alert("Pagamento confirmado! Obrigado pela sua compra.");
          setIsPaid(true);
          clearInterval(interval);
        }
      } catch (error: any) {
        console.log("Erro ao verificar status do pedido:", error);
      }
    }, 5000); // Verifica a cada 5 segundos
    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [order, isPix]);

  if (!order) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" component="p">
          Carregando detalhes do pedido...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 4, textAlign: "center" }}>
      <Paper
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          alignItems: "center",
        }}
      >
        {isPaid ? (
          <Box
            sx={{
              mb: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="h1" color="success.main">
              Pagamento Confirmado!
            </Typography>
            <Typography variant="body1">
              Obrigado pela sua compra. Seu pedido está sendo processado.
            </Typography>
            <Typography variant="h2">Dados do Comprador</Typography>
            <Typography variant="body1">{order.customer.name}</Typography>
            <Typography variant="body1">{order.customer.email}</Typography>
            <Typography variant="h2">Dados do Pedido</Typography>
            <Typography variant="body1">
              ID de Transação: {order.charges?.[0].id}
            </Typography>
            <Typography variant="body1">
              Valor Total:{" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(order.charges?.[0].amount.value / 100)}
            </Typography>
            <Typography variant="body1">
              Status do Pagamento:{" "}
              {order.charges?.[0].status === "PAID" ? "Pago" : "Pendente"}
            </Typography>

            <Typography variant="h2">Produtos Comprados</Typography>
            {order.items.map((item: any, index: number) => (
              <Box key={index} sx={{ mb: 1 }}>
                <Typography variant="body1">
                  {item.name} - Quantidade: {item.quantity} - Preço Unitário:
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(item.unit_amount / 100)}
                </Typography>
              </Box>
            ))}

            <CheckCircle color="success" sx={{ fontSize: 200 }} />

            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => router.push("/")}
            >
              Voltar para a Loja
            </Button>
          </Box>
        ) : (
          <>
            <Typography variant="h4" color="success.main">
              Pedido confirmado, Aguardando Pagamento
            </Typography>
            <Typography>ID do Pedido: {order.id}</Typography>
          </>
        )}

        {isPix && !isPaid && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography variant="h6">Pagamento via PIX</Typography>
            {pixImage && (
              <Box
                component="img"
                src={pixImage}
                alt="QR Code PIX"
                sx={{ width: 200, height: 200 }}
              />
            )}
            <TextField
              label="Código PIX"
              value={pixText}
              fullWidth
              slotProps={{
                htmlInput: {
                  readOnly: true,
                },
              }}
              sx={{ mt: 2 }}
            />
            <Button
              variant="outlined"
              onClick={() => navigator.clipboard.writeText(pixText)}
            >
              Copiar Código PIX
            </Button>

            {!isPix && (
              <Typography sx={{ mt: 2 }}>
                Seu pagamento via Cartão de Crédito está sendo processado. Você
                receberá uma confirmação por e-mail em breve.
              </Typography>
            )}

            <Button
              variant="contained"
              sx={{ mx: 2 }}
              onClick={() => router.push("/")}
            >
              Voltar para a Loja
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
