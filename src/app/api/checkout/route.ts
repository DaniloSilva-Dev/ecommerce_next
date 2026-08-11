import { NextResponse } from "next/server";
import { OrderPayload } from "@/app/types/order";

export async function POST(request: Request) {
  try {
    const body: OrderPayload = await request.json();

    const PAGBANK_TOKEN = process.env.PAGBANK_TOKEN;
    if(!PAGBANK_TOKEN) {
      console.error("PAGBANK_TOKEN não definido");
      return NextResponse.json(
        { error: "PAGBANK_TOKEN não definido" }, { status: 500 }
      );
    }
    const apiUrl = "https://sandbox.sdk.pagseguro.com/orders";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${PAGBANK_TOKEN}`,
        "Content-Type": "application/json",
        "Accept": "*/*"
      },
      body: JSON.stringify(body),
    });

    const responseText = await response.text();

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (error) {
      data = { message: responseText };
    }

    if (!response.ok) {
      console.error("Erro PAGBANK: ", data);
      return NextResponse.json(
        { error: data }, { status: response.status }
      );
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error : any) {
    console.error("Erro INTERNO: ", error.message);
    return NextResponse.json(
      { error: "Erro interno do servidor", details: error.message }, { status: 500 }
    );
  }
}
