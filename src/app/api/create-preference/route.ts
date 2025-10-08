import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

/* 

*| Medio      | Número              | Vencimiento | CVV | Resultado |
 | ---------- | ------------------- | ----------- | --- | --------- |
 | VISA       | 4509 9535 6623 3704 | 11/25       | 123 | Aprobado  |
 | Mastercard | 5031 7557 3453 0604 | 11/25       | 123 | Rechazado |


*/


export async function POST(request: NextRequest) {
  // TODO: Every value come from the request body
  const body = await request.json();

  try {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
    })
    const preference = new Preference(client);

    const body = {
      items: [
        {
          id: "english-class-reservation",
          title: "Reserva clase de inglés",
          quantity: 1,
          unit_price: 12000, // precio en ARS
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: "http://localhost:3000/checkout/callback/success",
        failure: "http://localhost:3000/checkout/callback/failure",
        pending: "http://localhost:3000/checkout/callback/pending"
      },
      auto_return: "approved"
    }

    const result = await preference.create({ body });

    return NextResponse.json({ preferenceId: result.id });
  } catch (error) {
    console.error('❌ Error creating preference:', error);
    return NextResponse.json({ error: 'Error creating preference' }, { status: 500 });
  }
}
