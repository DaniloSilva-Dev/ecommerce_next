"use client";

import { Box, Typography, Button, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  const chargeId = order?.charges?.[0]?.id || order?.id;
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

        // Verifica o status tanto na raiz do pedido (PIX) quanto nas cobranças (Cartão)
        const orderStatus = updateOrder.status;
        const chargeStatus = updateOrder.charges?.[0]?.status;

        if (orderStatus === "PAID" || chargeStatus === "PAID") {
          setIsPaid(true);
          clearInterval(interval);
        }
      } catch (error: any) {
        console.log("Erro ao verificar status do pedido:", error);
      }
    }, 5000);

    return () => clearInterval(interval);
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
    <Box sx={{ minHeight: "100vh", textAlign: "center" }}>
      <header
        style={{
          marginBottom: "2rem",
          width: "100%",
        }}
      >
        <span
          style={{
            color: "var(--primary-color)",
            fontWeight: "bold",
            fontSize: "4.5rem",
            textAlign: "center",
          }}
        >
          Ecommerce
        </span>
      </header>

      <Box sx={{ px: { xs: 2, sm: 4 } }}>
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
            <CheckCircle color="success" sx={{ fontSize: 120, mt: 2 }} />
            <Typography variant="h3" color="success.main">
              Pedido Realizado com Sucesso!
            </Typography>
            <Typography variant="body1">
              Obrigado por sua compra. Seu pedido foi confirmado e em breve será preparado para envio.
            </Typography>
            <Typography variant="body1" sx={{ bgcolor: "var(--neutral-color)", border: "0.1rem solid var(--tertiary-color)", borderRadius: "0.8rem", p: 0.3 }}>
              ID da cobrança: <span style={{ color: "var(--primary-color)" }}>{chargeId}</span>
            </Typography>

            <Box sx={{ mt: 2, width: "100%", maxWidth: 600, textAlign: "center", bgcolor: "var(--secondary-color)", border: "0.1rem solid var(--tertiary-color)", borderRadius: "0.8rem", p: 2 }}>
              <Typography variant="h5" sx={{ mt: 2 }}>
                Dados da Entrega
              </Typography>
              <Typography variant="body1">{order.customer.name}</Typography>
              <Typography variant="body1">{order.shipping_address?.street}</Typography>
            </Box>

            <Box sx={{ mt: 2, width: "100%", maxWidth: 600, textAlign: "center", bgcolor: "var(--secondary-color)", border: "0.1rem solid var(--tertiary-color)", borderRadius: "0.8rem", p: 2 }}>
              <Typography variant="h5" sx={{ mt: 2 }}>
                Resumo do Pedido
              </Typography>
              <Typography variant="body1">
                Total Pago:{" "}
                <span style={{ color: "var(--primary-color)", fontWeight: "bold" }}>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(
                    (order.charges?.[0]?.amount.value ||
                      order.qr_codes?.[0]?.amount.value) / 100,
                  )}
                </span>
              </Typography>

              <Typography variant="h5" sx={{ mt: 2 }}>
                Produtos Comprados
              </Typography>
              {order.items.map((item: any, index: number) => (
                <Box key={index} sx={{ mb: 1 }}>
                  <Typography variant="body1">
                    {item.name} - Qtd: {item.quantity} - Preço:{" "}
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.unit_amount / 100)}
                  </Typography>
                </Box>
              ))}
            </Box>
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
              Pedido confirmado!
            </Typography>
            <Typography>ID do Pedido: {order.id}</Typography>

            {/* SE FOR PIX E NÃO ESTIVER PAGO */}
            {isPix && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Typography variant="h6">
                  Aguardando Pagamento via PIX
                </Typography>
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
                  slotProps={{ htmlInput: { readOnly: true } }}
                  sx={{ mt: 2 }}
                />
                <Button
                  variant="outlined"
                  onClick={() => navigator.clipboard.writeText(pixText)}
                >
                  Copiar Código PIX
                </Button>
              </Box>
            )}

            {/* SE NÃO FOR PIX (Cartão de Crédito) E NÃO ESTIVER PAGO */}
            {!isPix && (
              <Typography sx={{ mt: 2, color: "text.secondary" }}>
                Seu pagamento via Cartão de Crédito está sendo processado. Você
                receberá uma confirmação na tela em instantes...
              </Typography>
            )}

            <Button
              variant="contained"
              sx={{ mx: 2, mt: 4 }}
              onClick={() => router.push("/")}
            >
              Voltar para a Loja
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
