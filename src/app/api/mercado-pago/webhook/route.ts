import crypto from "crypto";
import { NextResponse } from "next/server";

// Mercado Pago envía la notificación vía método POST
export async function POST(req: Request) {
  const headers = Object.fromEntries(req.headers.entries());
  console.log('Webhook received!!!');
  // console.log('Body obtained', body);
  console.log('Headers obtained', headers);
  let rawBody
  try {
    rawBody = await req.text(); // texto crudo contiene espacios, saltos de linea, formato real, valores originales, orden de las keys
    const signature = req.headers.get("x-signature");
    const secret = process.env.MERCADO_PAGO_WEBHOOK_SECRET!;

    if (!signature) {
      return new Response("Missing signature", { status: 400 });
    }

    // X-Signature: ts=1234567890,v1=abcdef...
    const [tsPart, hashPart] = signature.split(",");
    const ts = tsPart.replace("ts=", "").trim();
    const v1 = hashPart.replace("v1=", "").trim();

    // Construir string que MP firma
    const signedPayload = `${ts}.${rawBody}`;

    // Validar firma. Sin esta validacion cualquiera podria enviarte requests falsos
    const hash = crypto
      .createHmac("sha256", secret)
      .update(signedPayload)
      .digest("hex");

    if (hash !== v1) {
      console.warn("Invalid signature");
      return new Response("Invalid signature", { status: 401 });
    }

    // si llega acá es válido
    console.log("Webhook verificado correctamente");
  } catch (error) {
    console.error("❌ Error validando firma del webhook:", error);
  }

  try {
    // const body = await req.json(); // nextjs ya parsea el body a un objeto
    const body = JSON.parse(rawBody!)
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
      if (paymentInfo.status === "approved") {
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

// Una vez aprobado el pago
/*
status ("approved")
amount
payment_id
fecha
mail del pagador
etc.
*/