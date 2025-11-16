import crypto from "crypto";
import { NextResponse } from "next/server";

// Mercado Pago envía la notificación vía método POST
// MP no firma el body del webhook a diferencia de Stripe
export async function POST(req: Request) {
  const headers = Object.fromEntries(req.headers.entries());
  console.log('Webhook received!!!');
  // console.log('Body obtained', body);
  console.log('Headers obtained', headers);
  //let rawBody
  try {
    //rawBody = await req.text(); // texto crudo contiene espacios, saltos de linea, formato real, valores originales, orden de las keys
    const signature = req.headers.get("x-signature");
    const requestId = req.headers.get("x-request-id")
    const secret = process.env.MERCADO_PAGO_WEBHOOK_SECRET!;

    if (!signature) {
      return new Response("Missing signature", { status: 400 });
    }

    // const parts = signature.split(",");
    // const ts = parts[0]?.replace("ts=", "");
    // const v1 = parts[1]?.replace("v1=", "");
    // const endpoint = "https://speak-english-now-app.vercel.app/api/mercado-pago/webhook"; // $ Here add the actual domain URL

    // const data = `${ts}.${requestId}.${endpoint}`;
    // const hash = crypto
    //   .createHmac("sha256", secret)
    //   .update(data)
    //   .digest("hex");

    // if (hash !== v1) {
    //   console.warn("Invalid signature");
    //   return new Response("Invalid signature", { status: 401 });
    // }

    // si llega acá es válido
    console.log("Webhook verificado correctamente");
  } catch (error) {
    console.error("❌ Error validando firma del webhook:", error);
  }

  try {
    // const body = await req.json(); // nextjs ya parsea el body a un objeto
    const body = await req.json();
    console.log("📥 Webhook recibido desde Mercado Pago:", body);

    // Validar evento
    if (!body || !body.data || !body.data.id) {
      console.warn("Webhook inválido o sin ID de pago.");
      return NextResponse.json({ message: "invalid" }, { status: 200 });
    }

    // ? Obtener ID de pago
    const paymentId = body.data.id;

    // >>> Aquí vas a consultar el estado real del pago <<< Mercado Pago recomienda consultar la API con el paymentId
    try {
      const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
          },
        }
      );

      const paymentInfo = await mpRes.json();
      console.log("🔍 Pago consultado:", paymentInfo);

      // TODO: Ejemplo de uso: guardar en BD cuando se acreditó o rechazó
      if (paymentInfo.status === "approved" && paymentInfo.status_detail === "accredited") {
        console.log("✔ Pago acreditado. Guardar en BD.");
      }

      if (paymentInfo.status === "rejected") {
        console.log("❌ Pago rechazado.");
      }

      // Siempre responder 200 OK
      return NextResponse.json({ received: true }, { status: 200 });

    } catch (err) {
      console.error("❌ Error consultando pago:", err);
      return NextResponse.json({ error: "mp error" }, { status: 200 });
    }
  } catch (error) {
    console.error("❌ Error en webhook:", error);
    return NextResponse.json({ error: "parse error" }, { status: 200 });
  }

}

// Mercado Pago insiste en que SIEMPRE respondas 200 OK
//No importa si falló tu lógica; si respondés 500 ellos vuelven a mandar notificaciones infinitamente.

// Mercado Pago envía un body como este:
// {
//   "action": "payment.created",
//   "api_version": "v1",
//   "data": { "id": "123456789" },
//   "date_created": "2023-07-20T00:00:00Z",
//   "type": "payment"
// }

// Una vez aprobado el pago reicibire algo asi (utilizar para armar el modelo de la db)
/*
{
  "id": 123456789,
  "date_created": "2025-01-10T14:03:21.000-04:00",
  "date_approved": "2025-01-10T14:03:45.000-04:00",
  "status": "approved",
  "status_detail": "accredited",
  "payment_method_id": "visa",
  "payment_type_id": "credit_card",
  "payer": {
    "id": "987654321",
    "email": "cliente@example.com",
    "first_name": "Juan",
    "last_name": "Pérez"
  },
  "transaction_amount": 1000,
  "currency_id": "ARS",
  "description": "Clase individual x1",
  "metadata": {
    "type": "individual",
    "studentsCount": 1
  },
  "additional_info": {
    "items": [
      {
        "id": "english-class-123",
        "title": "Clase individual",
        "quantity": 1,
        "unit_price": 1000
      }
    ]
  },
  "order": {
    "id": "order-123",
    "type": "mercadopago"
  }
}
*/