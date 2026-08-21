"use client";

import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CheckCircle from "@mui/icons-material/CheckCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

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
        <Typography variant="h6">Carregando detalhes do pedido...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "var(--neutral-color)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        component="header"
        sx={{
          width: "100%",
          py: 4,
          textAlign: "center",
          backgroundColor: "var(--neutral-color)",
          borderBottom: "1px solid var(--tertiary-color)",
        }}
      >
        <Typography
          sx={{
            color: "var(--primary-color)",
            fontWeight: "bold",
            fontSize: "3rem",
          }}
        >
          Ecommerce
        </Typography>
      </Box>

      <Box
        sx={{
          px: { xs: 2, sm: 4 },
          py: 6,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isPaid ? (
          <Box
            sx={{
              width: "100%",
              maxWidth: 900,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CheckCircle sx={{ fontSize: 80, color: "#005338" }} />
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: "var(--primary-font-color)",
                mb: 1,
                textAlign: "center",
                fontSize: "2.8rem",
              }}
            >
              Pedido Realizado com Sucesso!
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "var(--primary-font-color)",
                mb: 4,
                textAlign: "center",
                maxWidth: 500,
                fontSize: "1.8rem",
              }}
            >
              Obrigado por sua compra. Seu pedido foi confirmado e em breve será
              preparado para envio.
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                bgcolor: "var(--neutral-color)",
                px: 2,
                py: 1,
                borderRadius: "50px",
                mb: 6,
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "var(--primary-font-color)", fontSize: "1.4rem" }}
              >
                ID da Cobrança:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "var(--primary-color)",
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                }}
              >
                #{chargeId}
              </Typography>
              <ContentCopyIcon
                sx={{
                  fontSize: 16,
                  color: "var(--tertiary-color)",
                  cursor: "pointer",
                }}
                onClick={() => navigator.clipboard.writeText(chargeId)}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
                width: "100%",
              }}
            >
              {/* DADOS DE ENTREGA */}
              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  p: 4,
                  border: "1px solid var(--tertiary-color)",
                  borderRadius: 3,
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
                >
                  <Box
                    sx={{
                      bgcolor: "var(--neutral-color)",
                      p: 1,
                      borderRadius: 2,
                      display: "flex",
                    }}
                  >
                    <LocalShippingOutlinedIcon
                      sx={{ color: "var(--primary-color)" }}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", fontSize: "2.4rem" }}
                  >
                    Dados de Entrega
                  </Typography>
                </Box>

                <Box
                  sx={{
                    textAlign: "left",
                    color: "var(--primary-font-color)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", mb: 1, fontSize: "1.6rem" }}
                  >
                    {order.customer?.name}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "1.6rem" }}>
                    {order.shipping?.address?.street},{" "}
                    {order.shipping?.address?.number}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "1.6rem" }}>
                    {order.shipping?.address?.locality},{" "}
                    {order.shipping?.address?.city} -{" "}
                    {order.shipping?.address?.region ||
                      order.shipping?.address?.region_code}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 2, fontSize: "1.6rem" }}
                  >
                    CEP: {order.shipping?.address?.postal_code}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "var(--primary-font-color)",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      fontSize: "1.6rem",
                    }}
                  >
                    <InfoOutlinedIcon sx={{ fontSize: 16 }} /> Entrega Padrão
                    (3-5 dias úteis)
                  </Typography>
                </Box>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  p: 4,
                  border: "1px solid var(--tertiary-color)",
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
                >
                  <Box
                    sx={{
                      bgcolor: "var(--neutral-color)",
                      p: 1,
                      borderRadius: 2,
                      display: "flex",
                    }}
                  >
                    <ReceiptLongOutlinedIcon
                      sx={{ color: "var(--primary-color)" }}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", fontSize: "2.4rem" }}
                  >
                    Resumo do Pedido
                  </Typography>
                </Box>

                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    mb: 3,
                  }}
                >
                  {order.items.map((item: any, index: number) => (
                    <Box
                      key={index}
                      sx={{ display: "flex", gap: 2, alignItems: "center" }}
                    >
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          bgcolor: "var(--neutral-color)",
                          borderRadius: 2,
                          flexShrink: 0,
                        }}
                      />
                      <Box sx={{ textAlign: "left", flexGrow: 1 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "bold", fontSize: "1.6rem" }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "var(--primary-font-color)",
                            fontSize: "1.6rem",
                          }}
                        >
                          Qtd: {item.quantity}
                        </Typography>
                      </Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold", fontSize: "1.6rem" }}
                      >
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(item.unit_amount / 100)}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "var(--primary-font-color)",
                      fontWeight: "medium",
                      fontSize: "1.4rem",
                    }}
                  >
                    Total Pago
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "var(--primary-color)",
                      fontWeight: "bold",
                      fontSize: "2.4rem",
                    }}
                  >
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(
                      (order.charges?.[0]?.amount.value ||
                        order.qr_codes?.[0]?.amount.value) / 100,
                    )}
                  </Typography>
                </Box>
              </Paper>
            </Box>

            {/* BOTÕES */}
            <Box sx={{ display: "flex", gap: 2, mt: 6 }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "var(--primary-color)",
                  borderRadius: "50px",
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Acompanhar Pedido{" "}
                <ArrowForwardIcon sx={{ ml: 1, fontSize: 18 }} />
              </Button>
              <Button
                variant="outlined"
                onClick={() => router.push("/")}
                sx={{
                  borderColor: "var(--tertiary-color)",
                  color: "var(--primary-font-color)",
                  borderRadius: "50px",
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Voltar para a Loja{" "}
                <StorefrontOutlinedIcon sx={{ ml: 1, fontSize: 18 }} />
              </Button>
            </Box>
          </Box>
        ) : (
          /* TELA DE ESPERA / PIX  */
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" color="success.main" sx={{ mb: 2 }}>
              Pedido confirmado!
            </Typography>
            <Typography>ID do Pedido: {order.id}</Typography>
            {isPix && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  alignItems: "center",
                  mt: 4,
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
                    sx={{ width: 250, height: 250 }}
                  />
                )}
                <TextField
                  label="Código PIX"
                  value={pixText}
                  fullWidth
                  slotProps={{ htmlInput: { readOnly: true } }}
                  sx={{ mt: 2, maxWidth: 400 }}
                />
                <Button
                  variant="outlined"
                  onClick={() => navigator.clipboard.writeText(pixText)}
                >
                  Copiar Código PIX
                </Button>
              </Box>
            )}
            {!isPix && (
              <Typography
                sx={{
                  mt: 4,
                  color: "var(--primary-font-color)",
                  maxWidth: 400,
                  mx: "auto",
                }}
              >
                Seu pagamento via Cartão de Crédito está sendo processado. Você
                receberá uma confirmação na tela em instantes...
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
