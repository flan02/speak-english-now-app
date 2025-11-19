// Mercado Pago envía la notificación vía método POST
import { KY, Method } from "@/services/api";
import { API_ROUTES } from "@/services/api/routes";
import { updatePayment } from "@/services/functions";

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
      const preferenceId = order.preference_id;
      const paymentFound = await updatePayment(preferenceId)

      if (paymentFound?.success) {
        console.log("✅ Pago actualizado en la base de datos");
        // TODO: Calling Calendar router
        const isClassUpdated = await KY(Method.POST, `${process.env.BASE_URL}${API_ROUTES.CALENDAR}`, {
          json: { preferenceId },
        });

        if (!isClassUpdated.success) {
          console.log("❌ Error al actualizar la clase virtual después del pago");
          return Response.json({ ok: false, status: 500 });
        }
      } else {
        console.log("❌ Error al actualizar el pago en la base de datos");
      }
    }

    return Response.json({ ok: true, status: 200 });
  }
  // Other events
  console.log("⚠ Webhook desconocido, ignorando");
  return Response.json({ ok: true });
}


