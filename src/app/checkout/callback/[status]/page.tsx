"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import confetti from 'canvas-confetti'
import { Card } from "@/components/ui/card";
import { LanguagesIcon } from "lucide-react";


export default function CallbackPage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const externalReference = searchParams.get("external_reference");
  const status = searchParams.get("status"); // success, failure, pending

  const router = useRouter();
  const [seconds, setSeconds] = useState(5);
  //console.log("Callback params:", { paymentId, externalReference, status });

  const launchConfetti = () => {

    const duration = 2 * 1000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
      })
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }

  useEffect(() => {
    if (status !== 'success') return
    if (status === 'success') {
      launchConfetti()
      const countdown = setInterval(() => {
        setSeconds((prev) => prev - 1)
      }, 1000)

      const redirectTimer = setTimeout(() => {
        router.push('http://localhost:3000/inicio/mis-clases-virtuales')
      }, 5000)

      return () => {
        clearInterval(countdown)
        clearTimeout(redirectTimer)
      }
    };
  }, [status, router])

  return (
    <div className="flex flex-col items-center justify-center xl:justify-center 2xl:justify-center min-h-screen text-center">
      {status === "success" && (
        <Card className="w-full max-w-5xl xl:h-[500px] 2xl:h-[500px] py-16 xl:px-16 xl:py-16 2xl:px-16 2xl:py-16 border border-card space-y-12">
          <div className="flex items-end space-x-4">
            <div className="w-full flex items-end">
              <LanguagesIcon className="pr-2 text-purple-500/70 size-20" />
              <h1 className="text-3xl lg:text-5xl font-bold text-lime-950">HABLA</h1>
              <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">INGLES</h1>
              <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">YA</h1>
            </div>
          </div>
          <h1 className="text-3xl xl:text-4xl 2xl:text-4xl font-bold text-green-600">¡Tu pago fue exitoso!</h1>
          <div className="flex flex-col px-4 xl:px-0 2xl:px-0 items-start xl:items-center 2xl:items-center space-y-4 text-lg xl:text-xl 2xl:text-xl">
            <p className="underline">ID de pago: {paymentId}</p>
            <p className="underline">Referencia: {externalReference}</p>
          </div>
          <div className="pt-12">
            <p className="text-xs xl:text-base 2xl:text-base font-bold">{`Serás redirigido a la aplicación en ${seconds} segundos`}</p>
          </div>
        </Card>
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
