import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import pricing from "@/config/pricing.json";
import { auth } from '@/auth';


export async function POST(request: NextRequest) {
  // TODO: Every value come from the request body
  const body = await request.json();
  const session = await auth()

  const { type, studentsCount, price } = body
  console.log('Request body:', body);

  if (!session?.user) {
    throw new Error('User not authenticated');
  }

  try {
    const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN! });

    const preference = new Preference(client);

    const body = {
      items: [
        {
          id: `${session.user.id}-${Date.now()}`,
          title: `Clase ${type === 'individual' ? 'individual' : 'grupal'} x${studentsCount == 1 ? 1 : Math.round(Math.floor(studentsCount) / pricing.groupPrice)}`,
          quantity: 1,
          unit_price: 1000, //Number(price), // precio en ARS
          currency_id: "ARS",
        },
      ],
      notification_url: `${process.env.BASE_URL}/api/mercado-pago/webhook`,
      metadata: {
        userId: session?.user.id,
        type,
        studentsCount,
        price
      },
      payment_methods: {
        excluded_payment_types: [], // puedes excluir tipos si querés
        excluded_payment_methods: [], // puedes excluir métodos específicos
        installments: 12, // máximo de cuotas
        crypto_currency: "ETH", // habilitar pago con criptomonedas
      },
    }

    //console.log('Creating preference with body:', body);

    const result = await preference.create({ body });
    //console.log("preferencia creada:", result.id);

    return NextResponse.json({ preferenceId: result.id });

  } catch (error) {
    console.error('❌ Error creating preference:', error);
    return NextResponse.json({ error: 'Error creating preference' }, { status: 500 });
  }
}
