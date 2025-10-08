import { useSearchParams } from "next/navigation";

export default function CallbackPage({ params }: { params: { status: string } }) {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const externalReference = searchParams.get("external_reference");

  const { status } = params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      {status === "success" && (
        <>
          <h1 className="text-3xl font-bold text-green-600">¡Pago exitoso!</h1>
          <p>ID de pago: {paymentId}</p>
          <p>Referencia: {externalReference}</p>
        </>
      )}

      {status === "failure" && (
        <>
          <h1 className="text-3xl font-bold text-red-600">El pago falló</h1>
          <p>Intentá nuevamente más tarde.</p>
        </>
      )}

      {status === "pending" && (
        <>
          <h1 className="text-3xl font-bold text-yellow-600">Pago pendiente</h1>
          <p>Estamos procesando tu transacción.</p>
        </>
      )}
    </div>
  );
}
