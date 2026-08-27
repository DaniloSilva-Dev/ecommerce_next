export interface Phone {
  countryCode: string;
  areaCode: string;
  number: string;
}

export interface Customer {
  name: string;
  email: string;
  tax_id: string;
  phone: Phone[];
}

export interface PagBankItem {
  reference_id: string;
  name: string;
  quantity: number;
  unit_amount: number;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  locality: string;
  city: string;
  region_code: string;
  country: string;
  postal_code: string;
}

export interface Holder {
  name: string;
  tax_id: string;
}

export interface Card {
  number: string;
  exp_month: string;
  exp_year: string;
  security_code: string;
  holder: Holder;
}
export interface PaymentMethod {
  type: "CREDIT_CARD" | "PIX" | "DEBIT_CARD";
  installments?: number;
  capture?: boolean;
  card?: Card;
}
export interface Charge {
  reference_id: string;
  description: string;
  amount: {
    value: number;
    currency: "BRL";
  };
  payment_method: PaymentMethod;
}

export interface QrCode {
  amount: {
    value: number;
  };
  expiration_date: string;
}

export interface OrderPayload {
  reference_id: string;
  customer: Customer;
  items: PagBankItem[];
  charges: Charge[];
  qr_codes?: QrCode[];
}
