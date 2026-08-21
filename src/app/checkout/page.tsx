"use client";

import {
  Box,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  CircularProgress,
  Paper,
  Divider,
  Container,
  InputAdornment,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/Person";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import QrCodeIcon from "@mui/icons-material/QrCode";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DeleteOutlineIcon from "@mui/icons-material/Delete";

import { useCheckout } from "@/hooks/use_checkout";
import { Button } from "@/components/primitives/button";
import { QuantityControl } from "src/components/primitives/quantity_control";
import { useCartStore } from "src/hooks/use_cart_store";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount / 100);
};

export default function Checkout() {
  const {
    form,
    onSubmit,
    buscarCep,
    isSubmitting,
    isFetchingCep,
    paymentMethod,
    items,
  } = useCheckout();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const { decreaseQuantity, addToCart: addItem } = useCartStore();

  const ccErrors = errors as Record<string, any>;

  const subtotal = items.reduce(
    (acc, item) =>
      acc + (item.discountedPrice ?? item.originalPrice) * item.quantity,
    0,
  );

  return (
    <Box sx={{ minHeight: "100vh", p: { xs: 0, sm: 2 } }}>
      <header
        style={{
          borderBottom: "0.1rem solid var(--tertiary-color)",
          marginBottom: "2rem",
        }}
      >
        <h1
          style={{
            color: "var(--primary-color)",
            fontWeight: "bold",
            fontSize: "4.5rem",
            textAlign: "center",
          }}
        >
          Ecommerce
        </h1>
      </header>
      <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2 } }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: "bold", mb: 4 }}
          gutterBottom
        >
          Finalizar Pedido
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              variant="outlined"
              sx={{ p: 3, borderRadius: 2, borderColor: "#e5e7eb" }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  fontSize: { xs: "1.5rem", sm: "1.4rem" },
                }}
              >
                Resumo do Pedido
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {items.map((item) => {
                  const finalPrice = item.discountedPrice ?? item.originalPrice;

                  return (
                    <Box
                      key={item.productId}
                      sx={{ display: "flex", gap: 2, alignItems: "center" }}
                    >
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          backgroundColor: "#f3f4f6",
                          borderRadius: 1,
                          flexShrink: 0,
                        }}
                        component="img"
                        src={item.imageUrl}
                        alt={item.name}
                      />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: "bold",
                            fontSize: { xs: "1.2rem", sm: "1.4rem" },
                            lineHeight: 1.2,
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: 1,
                          }}
                        >
                          <QuantityControl
                            quantity={item.quantity}
                            onDecrease={() => decreaseQuantity(item.productId)}
                            onIncrease={() => addItem(item)}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: "bold",
                              fontSize: { xs: "1.5rem", sm: "1.4rem" },
                            }}
                          >
                            {formatCurrency(finalPrice)}
                          </Typography>
                        </Box>
                      </Box>
                      <DeleteOutlineIcon
                        fontSize="small"
                        sx={{ color: "text.secondary", cursor: "pointer" }}
                      />
                    </Box>
                  );
                })}
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "1.5rem", sm: "1.4rem" } }}
                  >
                    Subtotal
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "medium",
                      fontSize: { xs: "1.5rem", sm: "1.4rem" },
                    }}
                  >
                    {formatCurrency(subtotal)}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "1.5rem", sm: "1.4rem" } }}
                  >
                    Frete
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "1.5rem", sm: "1.4rem" },
                    }}
                    color="primary"
                  >
                    GRÁTIS
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Total
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold" }}
                  color="primary"
                >
                  {formatCurrency(subtotal)}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* 1. DADOS DO COMPRADOR */}
              <Paper
                variant="outlined"
                sx={{ p: 4, borderRadius: 2, borderColor: "#e5e7eb", mb: 3 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 3,
                  }}
                >
                  <PersonOutlineIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    1. Dados do Comprador
                  </Typography>
                </Box>

                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      size="small"
                      label="Nome Completo"
                      {...register("name")}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      fullWidth
                      sx={{ bgcolor: "var(--neutral-color)" }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      size="small"
                      label="E-mail"
                      {...register("email")}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      fullWidth
                      sx={{ bgcolor: "var(--neutral-color)" }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      size="small"
                      label="CPF"
                      {...register("tax_id")}
                      error={!!errors.tax_id}
                      helperText={errors.tax_id?.message}
                      fullWidth
                      sx={{ bgcolor: "var(--neutral-color)" }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      size="small"
                      label="Telefone"
                      {...register("phone")}
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      fullWidth
                      sx={{ bgcolor: "var(--neutral-color)" }}
                    />
                  </Grid>
                </Grid>
              </Paper>

              {/* 2. ENDEREÇO DE ENTREGA */}
              <Paper
                variant="outlined"
                sx={{ p: 4, borderRadius: 2, borderColor: "#e5e7eb", mb: 3 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 3,
                  }}
                >
                  <LocalShippingOutlinedIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    2. Endereço de Entrega
                  </Typography>
                </Box>

                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      size="small"
                      label="CEP"
                      {...register("cep", { onBlur: buscarCep })}
                      error={!!errors.cep}
                      helperText={errors.cep?.message}
                      fullWidth
                      slotProps={{ inputLabel: { shrink: true } }}
                      sx={{ bgcolor: "var(--neutral-color)" }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 8 }}>
                    <TextField
                      size="small"
                      label="Rua / Avenida"
                      {...register("logradouro")}
                      error={!!errors.logradouro}
                      helperText={errors.logradouro?.message}
                      fullWidth
                      slotProps={{
                        input: {
                          endAdornment: isFetchingCep ? (
                            <InputAdornment position="end">
                              <CircularProgress size={18} />
                            </InputAdornment>
                          ) : undefined,
                        },
                        inputLabel: { shrink: true },
                      }}
                      sx={{ bgcolor: "var(--neutral-color)" }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      size="small"
                      label="Número"
                      {...register("numero")}
                      error={!!errors.numero}
                      helperText={errors.numero?.message}
                      fullWidth
                      sx={{ bgcolor: "var(--neutral-color)" }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 8 }}>
                    <TextField
                      size="small"
                      label="Complemento (Opcional)"
                      {...register("complemento")}
                      fullWidth
                      sx={{ bgcolor: "var(--neutral-color)" }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 5 }}>
                    <TextField
                      size="small"
                      label="Bairro"
                      {...register("bairro")}
                      error={!!errors.bairro}
                      helperText={errors.bairro?.message}
                      fullWidth
                      slotProps={{
                        input: {
                          endAdornment: isFetchingCep ? (
                            <InputAdornment position="end">
                              <CircularProgress size={18} />
                            </InputAdornment>
                          ) : undefined,
                        },
                        inputLabel: { shrink: true },
                      }}
                      sx={{ bgcolor: "var(--neutral-color)" }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 5 }}>
                    <TextField
                      size="small"
                      label="Cidade"
                      {...register("cidade")}
                      error={!!errors.cidade}
                      helperText={errors.cidade?.message}
                      fullWidth
                      slotProps={{
                        input: {
                          endAdornment: isFetchingCep ? (
                            <InputAdornment position="end">
                              <CircularProgress size={18} />
                            </InputAdornment>
                          ) : undefined,
                        },
                        inputLabel: { shrink: true },
                      }}
                      sx={{ bgcolor: "var(--neutral-color)" }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 2 }}>
                    <TextField
                      size="small"
                      label="UF"
                      {...register("uf")}
                      error={!!errors.uf}
                      helperText={errors.uf?.message}
                      fullWidth
                      slotProps={{
                        input: {
                          endAdornment: isFetchingCep ? (
                            <InputAdornment position="end">
                              <CircularProgress size={18} />
                            </InputAdornment>
                          ) : undefined,
                        },
                        inputLabel: { shrink: true },
                      }}
                      sx={{ bgcolor: "var(--neutral-color)" }}
                    />
                  </Grid>
                </Grid>
              </Paper>

              {/* 3. FORMA DE PAGAMENTO */}
              <Paper
                variant="outlined"
                sx={{ p: 4, borderRadius: 2, borderColor: "#e5e7eb", mb: 4 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 3,
                  }}
                >
                  <PaymentsOutlinedIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    3. Forma de Pagamento
                  </Typography>
                </Box>

                <RadioGroup defaultValue="CREDIT_CARD" sx={{ gap: 1.5, mb: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid",
                      borderColor:
                        paymentMethod === "PIX" ? "primary.main" : "#e5e7eb",
                      borderRadius: 2,
                      p: 1,
                      backgroundColor:
                        paymentMethod === "PIX" ? "#f4f6ff" : "transparent",
                    }}
                  >
                    <FormControlLabel
                      value="PIX"
                      control={<Radio {...register("paymentMethod")} />}
                      label="PIX"
                      sx={{ flexGrow: 1, m: 0 }}
                    />
                    <QrCodeIcon color="action" sx={{ mr: 1 }} />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid",
                      borderColor:
                        paymentMethod === "CREDIT_CARD"
                          ? "primary.main"
                          : "#e5e7eb",
                      borderRadius: 2,
                      p: 1,
                      backgroundColor:
                        paymentMethod === "CREDIT_CARD"
                          ? "#f4f6ff"
                          : "transparent",
                    }}
                  >
                    <FormControlLabel
                      value="CREDIT_CARD"
                      control={<Radio {...register("paymentMethod")} />}
                      label="Cartão de Crédito"
                      sx={{ flexGrow: 1, m: 0 }}
                    />
                    <CreditCardIcon color="action" sx={{ mr: 1 }} />
                  </Box>
                </RadioGroup>

                {paymentMethod === "CREDIT_CARD" && (
                  <Grid container spacing={2.5}>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        size="small"
                        label="Número do Cartão"
                        {...register("cardNumber")}
                        error={!!ccErrors.cardNumber}
                        helperText={ccErrors.cardNumber?.message}
                        fullWidth
                        sx={{ bgcolor: "var(--neutral-color)" }}
                      />
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                      <TextField
                        size="small"
                        label="Mês (MM)"
                        {...register("expMonth")}
                        error={!!ccErrors.expMonth}
                        helperText={ccErrors.expMonth?.message}
                        fullWidth
                        sx={{ bgcolor: "var(--neutral-color)" }}
                      />
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                      <TextField
                        size="small"
                        label="Ano (AAAA)"
                        {...register("expYear")}
                        error={!!ccErrors.expYear}
                        helperText={ccErrors.expYear?.message}
                        fullWidth
                        sx={{ bgcolor: "var(--neutral-color)" }}
                      />
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                      <TextField
                        size="small"
                        label="CVV"
                        {...register("cvv")}
                        error={!!ccErrors.cvv}
                        helperText={ccErrors.cvv?.message}
                        fullWidth
                        sx={{ bgcolor: "var(--neutral-color)" }}
                      />
                    </Grid>
                  </Grid>
                )}
              </Paper>

              {/* BOTÃO E FOOTER SEGURO */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting || items.length === 0}
                  style={{
                    width: "100%",
                    padding: "1rem",
                    fontSize: "1.6rem",
                    display: "flex",
                    gap: "0.5rem",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <>
                      <LockOutlinedIcon fontSize="medium" />
                      Finalizar Compra
                    </>
                  )}
                </Button>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mt: 2,
                    color: "text.secondary",
                  }}
                >
                  <VerifiedUserOutlinedIcon fontSize="large" />
                  <Typography variant="body2" sx={{ fontSize: "1.4rem" }}>
                    Ambiente 100% seguro e criptografado
                  </Typography>
                </Box>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
