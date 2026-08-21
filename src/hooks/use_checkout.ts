import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useCartStore } from "src/hooks/use_cart_store";
import { Address } from "src/app/types/order";

const addressSchema = z.object({
  cep: z.string().min(8, "CEP inválido"),
  logradouro: z.string().min(1, "Rua obrigatória"),
  numero: z.string().min(1, "Número obrigatório"),
  complemento: z.string().optional(),
  bairro: z.string().min(1, "Bairro obrigatório"),
  cidade: z.string().min(1, "Cidade obrigatória"),
  uf: z.string().length(2, "UF inválida"),
});

const baseSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.email("Email inválido"),
  tax_id: z.string().min(11, "CPF é obrigatório").max(14, "Documento inválido"),
  phone: z.string().min(10, "Telefone é obrigatório"),
});

const paymentSchema = z.discriminatedUnion("paymentMethod", [
  z.object({ paymentMethod: z.literal("PIX") }),
  z.object({
    paymentMethod: z.literal("CREDIT_CARD"),
    cardNumber: z
      .string()
      .min(16, "Número inválido")
      .max(16, "Número inválido"),
    expMonth: z.string().min(2, "Mês inválido").max(2, "Mês inválido"),
    expYear: z.string().min(4, "Ano inválido").max(4, "Ano inválido"),
    cvv: z.string().min(3, "CVV inválido").max(4, "CVV inválido"),
  }),
]);

const checkoutSchema = baseSchema.merge(addressSchema).and(paymentSchema);
export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export function useCheckout() {
  const { cartItems: items, clearCart } = useCartStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingCep, setIsFetchingCep] = useState(false);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "CREDIT_CARD",
    },
  });

  const { setValue, setFocus, watch } = form;
  const paymentMethod = watch("paymentMethod");

  const buscarCep = async (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const cepLimpo = event.target.value.replace(/\D/g, "");
    if (cepLimpo.length !== 8) return;

    const loadingStartedAt = Date.now();
    setIsFetchingCep(true);
    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`,
      );
      const data = await response.json();

      if (!data.erro) {
        setValue("logradouro", data.logradouro, { shouldValidate: true });
        setValue("bairro", data.bairro, { shouldValidate: true });
        setValue("cidade", data.localidade, { shouldValidate: true });
        setValue("uf", data.uf, { shouldValidate: true });
        setFocus("numero");
      }
    } catch (error) {
      console.error("Erro ao buscar CEP", error);
    } finally {
      const remainingLoadingTime = 450 - (Date.now() - loadingStartedAt);
      if (remainingLoadingTime > 0) {
        await new Promise((resolve) =>
          setTimeout(resolve, remainingLoadingTime),
        );
      }
      setIsFetchingCep(false);
    }
  };

  const onSubmit = async (data: CheckoutFormData) => {
    console.log("Dados do formulário:", data);

    if (items.length === 0) {
      alert("O carrinho está vazio.");
      return;
    }
    setIsSubmitting(true);

    const subtotal = items.reduce(
      (acc, item) =>
        acc + (item.discountedPrice ?? item.originalPrice) * item.quantity,
      0,
    );
    const cleanPhone = data.phone.replace(/\D/g, "");
    const phoneArea = cleanPhone.substring(0, 2);
    const phoneNumber = cleanPhone.substring(2);

    const address: Address = {
      street: data.logradouro,
      number: data.numero,
      locality: data.bairro,
      city: data.cidade,
      region_code: data.uf,
      country: "BRA",
      postal_code: data.cep.replace(/\D/g, ""),
    };

    const payload: any = {
      reference_id: `REF-${Date.now()}`,
      customer: {
        name: data.name,
        email: data.email,
        tax_id: data.tax_id.replace(/\D/g, ""),
        phones: [
          {
            country: "55",
            area: phoneArea,
            number: phoneNumber,
            type: "MOBILE",
          },
        ],
      },
      shipping: {
        address: address,
      },
      items: items.map((item) => {
        const finalPrice = item.discountedPrice ?? item.originalPrice;

        return {
          reference_id: String(item.productId),
          name: item.name,
          quantity: item.quantity,
          unit_amount: finalPrice,
        };
      }),
    };

    if (data.paymentMethod === "PIX") {
      payload.qr_codes = [{ amount: { value: subtotal } }];
    } else {
      payload.charges = [
        {
          reference_id: `CHG-${Date.now()}`,
          description: "Compra no Ecommerce",
          amount: { value: subtotal, currency: "BRL" },
          payment_method: {
            type: "CREDIT_CARD",
            installments: 1,
            capture: true,
            card: {
              number: data.cardNumber!.replace(/\D/g, ""),
              exp_month: data.expMonth!,
              exp_year: data.expYear!,
              security_code: data.cvv!,
              holder: {
                name: data.name,
                tax_id: data.tax_id.replace(/\D/g, ""),
                address: {
                  street: data.logradouro,
                  number: data.numero,
                  locality: data.bairro,
                  city: data.cidade,
                  region: data.uf,
                  region_code: data.uf,
                  country: "BRA",
                  postal_code: data.cep.replace(/\D/g, ""),
                },
              },
            },
          },
        },
      ];
    }

    console.log("Payload PagBank:", payload);

    try {
      const response = await fetch("/api/checkout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error("Falha na requisição");
      }

      const itemsByReference = new Map(
        items.map((item) => [String(item.productId), item]),
      );
      const orderWithImages = {
        ...responseData,
        items: responseData.items.map((item: any) => ({
          ...item,
          imageUrl: itemsByReference.get(item.reference_id)?.imageUrl,
        })),
      };

      sessionStorage.setItem("lastOrder", JSON.stringify(orderWithImages));
      clearCart();
      router.push("/conclusao");
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      alert("Erro ao processar o pedido. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit,
    buscarCep,
    isSubmitting,
    isFetchingCep,
    paymentMethod,
    items,
  };
}
