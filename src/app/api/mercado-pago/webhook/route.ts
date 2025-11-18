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

