"use client";
import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { OrderPayload } from "@/app/types/order";
import { useCartStore } from "src/hooks/useCartStore";

const baseSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.email("Email inválido"),
  tax_id: z.string().min(11, "CPF é obrigatório").max(14, "Documento inválido"),
  phone: z.string().min(10, "Telefone é obrigatório"),
});

const paymentSchema = z.discriminatedUnion("paymentMethod", [
  z.object({
    paymentMethod: z.literal("PIX"),
  }),
  z.object({
    paymentMethod: z.literal("CREDIT_CARD"),
    cardNumber: z
      .string()
      .min(16, "Número do cartão inválido")
      .max(16, "Número do cartão inválido"),
    expMonth: z
      .string()
      .min(2, "Mês de expiração inválido")
      .max(2, "Mês de expiração inválido"),
    expYear: z
      .string()
      .min(4, "Ano de expiração inválido")
      .max(4, "Ano de expiração inválido"),
    cvv: z.string().min(3, "CVV inválido").max(4, "CVV inválido"),
  }),
]);

const checkoutSchema = z.intersection(baseSchema, paymentSchema);
type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { cartItems: items, clearCart } = useCartStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "CREDIT_CARD",
    },
  });

  const paymentMethod = watch("paymentMethod");

  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) {
      alert(
        "O carrinho está vazio. Adicione produtos antes de finalizar a compra.",
      );
      return;
    }
    setIsSubmitting(true);
    const subtotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    const cleanPhone = data.phone.replace(/\D/g, "");
    const phoneArea = cleanPhone.substring(0, 2);
    const phoneNumber = cleanPhone.substring(2);

    const payload: OrderPayload = {
      qr_codes: [],
      charges: [],
      reference_id: `REF-${Date.now()}`,
      customer: {
        name: data.name,
        email: data.email,
        tax_id: data.tax_id.replace(/\D/g, ""),
        phone: [
          {
            countryCode: "55",
            areaCode: phoneArea,
            number: phoneNumber,
          },
        ],
      },
      items: items.map((item) => ({
        reference_id: item.productId,
        name: item.name,
        quantity: item.quantity,
        unit_amount: item.price,
      })),
    };
    if (data.paymentMethod === "PIX") {
      payload.qr_codes = [
        {
          amount: {
            value: subtotal,
          },
          expiration_date: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 minutos
        },
      ];
    } else {
      payload.charges = [
        {
          reference_id: `CHG-${Date.now()}`,
          description: "Compra no Ecommerce",
          amount: {
            value: subtotal,
            currency: "BRL",
          },
          payment_method: {
            type: "CREDIT_CARD",
            installments: 1,
            capture: true,
            card: {
              number: data.cardNumber,
              exp_month: data.expMonth,
              exp_year: data.expYear,
              security_code: data.cvv,
              holder: {
                name: data.name,
                tax_id: data.tax_id.replace(/\D/g, ""),
              },
            },
          },
        },
      ];
    }
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Erro ao processar o pagamento: ", result);
        alert("Erro ao processar o pagamento. Por favor, tente novamente.");
      }
      if (response.ok) {
        clearCart();
        router.push("/conclusao");
        console.log("Pedido criado com sucesso! ", result);
      }
    } catch (error) {
      console.error("Erro ao processar o pagamento: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const ccErrors = errors as Record<string, any>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Checkout
      </Typography>

      <Paper
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ p: 4, width: "100%", maxWidth: 600 }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h6">Informações do Cliente</Typography>
          <TextField
            label="Nome"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="CPF"
            {...register("tax_id")}
            error={!!errors.tax_id}
            helperText={errors.tax_id?.message}
          />
          <TextField
            label="Telefone"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <Typography variant="h6">Pagamento</Typography>

          <FormControl>
            <FormLabel>Método de Pagamento</FormLabel>
            <RadioGroup row defaultValue="CREDIT_CARD" sx={{ mt: 1 }}>
              <FormControlLabel
                value="CREDIT_CARD"
                control={<Radio {...register("paymentMethod")} />}
                label="Cartão de Crédito"
              />
              <FormControlLabel
                value="PIX"
                control={<Radio {...register("paymentMethod")} />}
                label="PIX"
              />
            </RadioGroup>
          </FormControl>

          {paymentMethod === "CREDIT_CARD" && (
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  label="Número do Cartão"
                  {...register("cardNumber")}
                  error={!!ccErrors.cardNumber}
                  helperText={ccErrors.cardNumber?.message}
                  fullWidth
                />
              </Grid>
              <Grid size={4}>
                <TextField
                  label="Mês de Expiração (MM)"
                  {...register("expMonth")}
                  error={!!ccErrors.expMonth}
                  helperText={ccErrors.expMonth?.message}
                  fullWidth
                />
              </Grid>
              <Grid size={4}>
                <TextField
                  label="Ano de Expiração (AAAA)"
                  {...register("expYear")}
                  error={!!ccErrors.expYear}
                  helperText={ccErrors.expYear?.message}
                  fullWidth
                />
              </Grid>
              <Grid size={4}>
                <TextField
                  label="CVV"
                  {...register("cvv")}
                  error={!!ccErrors.cvv}
                  helperText={ccErrors.cvv?.message}
                  fullWidth
                />
              </Grid>
            </Grid>
          )}
        </Box>

        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ mt: 3 }}
          disabled={isSubmitting || items.length === 0}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Finalizar Compra"
          )}
        </Button>
      </Paper>
    </Box>
  );
}
