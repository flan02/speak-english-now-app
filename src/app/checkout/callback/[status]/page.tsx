"use client"
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { LanguagesIcon } from "lucide-react";
import useConfetti from "@/hooks/useConfetti";


export default function CallbackPage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const externalReference = searchParams.get("external_reference");
  const status = searchParams.get("status"); // success, failure, pending
  const { seconds } = useConfetti({ status: status! });

  return (
    <div className="flex flex-col items-center justify-center xl:justify-center 2xl:justify-center min-h-screen text-center mx-1 xl:mx-0">
      {
        status === "success" && (
          <Card className="w-full max-w-5xl xl:h-[500px] 2xl:h-[500px] py-16 xl:px-16 xl:py-16 2xl:px-16 2xl:py-16 border border-card space-y-12">
            <div className="flex items-end space-x-4 mx-1 xl:mx-0 2xl:mx-0">
              <div className="w-full flex items-end">
                <LanguagesIcon className="pr-2 text-purple-500/70 size-16 xl:size-20" />
                <h1 className="text-3xl lg:text-5xl font-bold text-lime-950">HABLA</h1>
                <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">INGLES</h1>
                <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">YA</h1>
              </div>
            </div>
            <h1 className="text-2xl xl:text-4xl 2xl:text-4xl font-bold text-green-600">¡Tu pago fue exitoso!</h1>
            <div className="flex flex-col px-4 xl:px-0 2xl:px-0 items-start xl:items-center 2xl:items-center space-y-4 text-base xl:text-xl 2xl:text-xl">
              <p className="underline underline-offset-2">ID de pago: {paymentId}</p>
              <p className="underline underline-offset-2">Referencia: {externalReference}</p>
            </div>
            <div className="pt-12">
              <p className="text-xs xl:text-base 2xl:text-base font-bold">{`Serás redirigido a la aplicación en ${seconds} segundos`}</p>
            </div>
          </Card>
        )
      }
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
