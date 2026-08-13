import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("id");
  const token = process.env.PAGBANK_TOKEN;

  if (!orderId) {
    return NextResponse.json({ error: "Id não fornecido" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://sandbox.api.pagseguro.com/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );
    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao buscar o status do pedido" },
        { status: response.status },
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar o status do pedido: ", error);
    return NextResponse.json(
      { error: "Erro ao buscar o status do pedido" },
      { status: 500 },
    );
  }
}
