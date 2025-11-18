import { NextResponse } from "next/server";

// Mercado Pago envía la notificación vía método POST
// MP no firma el body del webhook a diferencia de Stripe
export async function POST(req: Request) {
  console.log("🚚 Webhook recibido!");

  const raw = await req.text();
  console.log("RAW BODY:", raw);

  let body: any = {};
  try {
    body = JSON.parse(raw);
  } catch {
    console.log("⚠ No se pudo parsear JSON. Continuamos...");
  }

  const topic = body?.topic
  const resource = body?.resource

  console.log("TOPIC", topic);

  // -------------------------
  // 🎯 1. Llega un webhook de PAYMENT (no usar resource)
  // -------------------------
  if (topic === "payment") {
    console.log("📬 Webhook 'payment' recibido. Ignorando (normal).");
    return Response.json({ ok: true });
  }

  // const merchantOrderUrl = body?.resource;
  if (topic === "merchant_order") {
    if (!resource) {
      console.log("⚠ Webhook sin resource URL");
      return Response.json({ ok: true });
    }

    console.log("📡 Consultando merchant_order:", resource);

    const orderRes = await fetch(resource, {
      headers: {
        Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
      },
    });

    const order = await orderRes.json();
    console.log("📦 MERCHANT ORDER:", order);

    const payment = order.payments?.[0];
    if (!payment) {
      console.log("⚠ La orden no tiene pagos aún");
      return Response.json({ ok: true });
    }

    console.log("💳 PAYMENT:", payment);

    if (payment.status === "approved") {
      console.log("✔ Pago aprobado, guardar en base de datos");
    }

    return Response.json({ ok: true });
  }
  // Other events
  console.log("⚠ Webhook desconocido, ignorando");
  return Response.json({ ok: true });
}

// export async function POST(req: Request) {
//   console.log("Webhook received!!!");

//   // 🔥 Leer body crudo
//   const rawBody = await req.text();
//   console.log("RAW BODY:", rawBody);



//   // 2) Leer headers necesarios
//   const signature = req.headers.get("x-signature");
//   const requestId = req.headers.get("x-request-id");
//   const webhookSecret = process.env.MERCADO_PAGO_WEBHOOK_SECRET!; // tu secret real

//   if (!signature || !webhookSecret) {
//     console.warn("⚠ No hay firma o falta MP_WEBHOOK_SECRET");
//     return NextResponse.json({ received: true }, { status: 200 });
//   }

//   // 3) Validar firma
//   try {
//     // Extraer ts y v1
//     const [tsPart, v1Part] = signature.split(",");
//     const ts = tsPart.split("=")[1];
//     const v1 = v1Part.split("=")[1];

//     // Construir string base
//     const data = `${ts}.${rawBody}.${webhookSecret}`;

//     // Crear hash
//     const hash = crypto
//       .createHmac("sha256", webhookSecret)
//       .update(data)
//       .digest("hex");

//     if (hash !== v1) {
//       console.log("❌ Firma inválida. Webhook rechazado.");
//       return NextResponse.json({ ok: false }, { status: 200 });
//     }

//     console.log("✔ Firma válida. Webhook aceptado.");
//   } catch (err) {
//     console.error("❌ Error validando firma:", err);
//     return NextResponse.json({ received: true }, { status: 200 });
//   }

//   // 4 Parseo seguro
//   let body: any = {};
//   try {
//     body = JSON.parse(rawBody);
//   } catch {
//     console.log("⚠ No se pudo parsear JSON. Continuamos...");
//   }

//   console.log("BODY PARSED", body);

//   const paymentId = body?.data?.id;
//   if (!paymentId) {
//     console.warn("Webhook inválido o sin ID de pago.");
//     return NextResponse.json({ ok: true }, { status: 200 });
//   }

//   // 🔍 Consultar pago real
//   try {
//     const mpRes = await fetch(
//       `https://api.mercadopago.com/v1/payments/${paymentId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
//         },
//       }
//     );

//     const paymentInfo = await mpRes.json();
//     console.log("🔍 Pago consultado:", paymentInfo);

//     if (paymentInfo.status === "approved") {
//       console.log("✔ Pago aprobado. Guardar en BD.");
//     }

//     return NextResponse.json({ ok: true }, { status: 200 });

//   } catch (err) {
//     console.error("❌ Error consultando pago:", err);
//     return NextResponse.json({ ok: true }, { status: 200 });
//   }
// }


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

/* 
Validar firma

    const parts = signature.split(",");
    const ts = parts[0]?.replace("ts=", "");
    const v1 = parts[1]?.replace("v1=", "");
    const endpoint = "https://speak-english-now-app.vercel.app/api/mercado-pago/webhook"; // $ Here add the actual domain URL

    const data = `${ts}.${requestId}.${endpoint}`;
    const hash = crypto
      .createHmac("sha256", secret)
      .update(data)
      .digest("hex");

    if (hash !== v1) {
      console.warn("Invalid signature");
      return new Response("Invalid signature", { status: 401 });
    }
*/