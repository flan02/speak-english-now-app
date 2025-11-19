import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import pricing from "@/config/pricing.json";
import { auth } from '@/auth';
import { createPayment } from '@/services/functions';
import { PaymentMP } from '@/lib/types';


export async function POST(request: NextRequest) {
  // TODO: Every value come from the request body
  const body = await request.json();
  const session = await auth()

  const { type, studentsCount, price } = body

  console.log('Request body in create preference:', body);


  if (!session?.user) {
    throw new Error('User not authenticated');
  }

  try {
    const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN! });

    const preference = new Preference(client);

    const mpBody = {
      items: [
        {
          id: `${session.user.id}-${Date.now()}`,
          title: `HablaInglesYa - Clase virtual para ${studentsCount} persona(s)`,
          quantity: 1,
          unit_price: 50, // * const price (sent by frontend body json)
          currency_id: "ARS",
        }
      ],
      notification_url: `${process.env.BASE_URL}api/mercado-pago/webhook`,
      payment_methods: {
        excluded_payment_types: [], // puedes excluir tipos si querés
        excluded_payment_methods: [], // puedes excluir métodos específicos
        installments: 12, // máximo de cuotas
      },
      back_urls: {
        success: `${process.env.BASE_URL}/checkout/callback/success`,
        failure: `${process.env.BASE_URL}/checkout/callback/failure`,
        pending: `${process.env.BASE_URL}/checkout/callback/pending`,
      },
      auto_return: "approved",
    }

    const result = await preference.create({ body: mpBody });

    if (!result.id) {
      return NextResponse.json({ error: 'Failed to create preference' }, { status: 500 });
    }
    // TODO: Create a new prisma model to save the current payment attempt
    const data: PaymentMP = {
      userId: session.user.id,
      preferenceId: result.id,
      amount: Number(price),
      type: type,
      maxParticipants: Number(studentsCount),
      status: 'pending',
    }

    const paymentCreated = await createPayment(data);

    if (!paymentCreated?.success) {
      return NextResponse.json({ error: 'Failed to create payment record in our database' }, { status: 500 });
    }
    return NextResponse.json({ preferenceId: result.id });

  } catch (error) {
    console.error('❌ Error creating preference:', error);
    return NextResponse.json({ error: 'Error creating preference' }, { status: 500 });
  }
}
