'use client'
import H1 from '@/components/html/h1';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toGoogleDate } from '@/lib/utils';
import { KY, Method } from '@/services/api';
import { storePaymentData } from '@/zustand/store';
import { initMercadoPago } from '@mercadopago/sdk-react';
import { ArrowLeftCircle, CreditCard, PenTool } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react'

type Props = {}

const PreCompraPage = () => {
  const { payment, isGroupClass, selectedDate, studentsCount, price, scheduledTime, text } = storePaymentData();
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const router = useRouter();

  // * CALL CHECKOUT BRICKS FROM MERCADO PAGO
  const handlePayment = async () => {
    //console.log('handle payments', classMetadata);

    const classMetadata = {
      type: isGroupClass ? 'grupo' : 'individual',
      studentsCount: studentsCount == 0 ? 1 : studentsCount,
      price: studentsCount > 2 ? (studentsCount) : price
    }
    setIsLoading(true);

    try {
      const response = await KY(Method.POST, 'http://localhost:3000/api/mercado-pago/create-preference', {
        json: classMetadata
      })

      const data = await response.json();
      console.log('response from mercado pago', data.preferenceId);

      if (data.preferenceId) {
        initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!);

        const renderPaymentBrick = async (preferenceId: string) => {
          if (!window.MercadoPago) {
            console.error("MercadoPago SDK no cargado aún");
            return;
          }

          // Instancia de MercadoPago
          const mp = new window.MercadoPago(
            process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!,
            { locale: "es-AR" }
          );

          // Obtener el builder de bricks
          const bricksBuilder = mp.bricks();

          // Crear el payment brick
          await bricksBuilder.create("wallet", "payment-brick", {
            initialization: { preferenceId: preferenceId, amount: studentsCount > 2 ? (studentsCount) : price },
            customization: { visual: { style: { theme: "dark" } } },
            texts: {
              valueProp: 'smart_option', // muestra “pago rápido con Mercado Pago”
            },
            callbacks: {
              onReady: () => {
                console.log("Payment Brick listo!");
              },
              onError: (error: any) => {
                console.error("Error en Payment Brick:", error);
              },
              onSubmit: () => {
                console.log("💳 Usuario inició el pago");
              },
              onPaymentCompleted: async (paymentData: any) => {
                console.log("💰 Pago completado:", paymentData);
                // Aquí podrías redirigir al usuario o mostrar un mensaje de éxito

                // * TODO: Add real value
                let payment = {
                  id: paymentData.id,
                  status: paymentData.status
                }

                router.push(`/checkout/callback/success?payment_id=${payment.id}&status=success`)

                // TODO: Calling to google api calendar to create event (pass date and user)
                await KY(Method.POST, 'http://localhost:3000/api/calendar', {})
              }
            },
          });
        };
        // TODO: We calling mp api
        renderPaymentBrick(data.preferenceId);

        setIsLoading(false);

        setIsConfirm(true);
      } else {
        console.error("No se recibió un ID de preferencia:", data.preferenceId);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  }

  // * Simular pago exitoso
  const simulateSuccessPayment = async () => {
    setIsLoading(true);

    try {

      // TODO: Simulate booking event in google api calendar
      const toGoogleCalendarEvent = {
        start: `${toGoogleDate(scheduledTime.start!)}`,
        end: `${toGoogleDate(scheduledTime.end!)}`,
        isGroupClass,
        studentsCount,
        text
      }

      await KY(Method.POST, 'http://localhost:3000/api/calendar', {
        json: toGoogleCalendarEvent
      })

    } catch (error) {
      console.error("Error fetching user data:", error);
    }



    try {
      const classMetadata = {
        type: isGroupClass ? 'grupo' : 'individual',
        studentsCount: studentsCount == 0 ? 1 : studentsCount,
        price: studentsCount > 2 ? (studentsCount) : price
      }


      const response = await KY(Method.POST, 'http://localhost:3000/api/mercado-pago/create-preference', {
        json: classMetadata
      })

      const data = await response.json();
      //console.log('response from mercado pago', data.preferenceId);

      if (data.preferenceId) {

        const simulatedParams = new URLSearchParams({
          payment_id: 'TEST1234',
          status: 'success',
          preference_id: data.preferenceId,
        }).toString();

        // * REDIRECT TO CALLBACK SUCCESS PAGE
        window.location.href = `http://localhost:3000/checkout/callback/success?${simulatedParams}`;
      }


    } catch (error) {
      console.error("Error simulating payment", error)
    }
  };



  return (
    <>
      <div className='flex space-x-4 justify-between items-end'>
        <div className='flex items-end space-x-2'>
          <CreditCard className='mb-0.5' />
          <H1 title='Revisa y abona tu reserva' />
        </div>
        <Link href='/inicio/reservas' className='underline'>
          <ArrowLeftCircle />
        </Link>
      </div>
      <article className='flex space-x-2 items-end'>
        <PenTool />
        <h2 className='font-roboto uppercase font-bold text-xs'>Esta es la información de la clase a reservar:</h2>
      </article>
      <section className="w-full max-w-6xl mx-auto px-4 py-2">
        <Card className='w-full h-[600px] border border-card py-4 px-4'>

          <div className='space-y-4 py-8'>

            <div className='space-y-8 px-8'>
              <p className='font-roboto text-3xl'>Tipo de clase: <span className='font-extrabold capitalize'>{isGroupClass ? 'grupal' : 'individual'}</span></p>
              <p className='font-roboto text-3xl'>Cantidad de estudiantes: <span className='font-extrabold'>{studentsCount == 0 ? 1 : Math.floor((studentsCount) / 10000)}</span></p>
              <p className='font-roboto text-3xl'>Fecha: <span className='font-extrabold'>{selectedDate}</span></p>
              <p className='font-roboto text-3xl'>Hora: <span className='font-extrabold'>{`${scheduledTime?.start?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} - ${scheduledTime?.end?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`} hs</span></p>
              <p className='font-roboto text-3xl'>Precio: <span className='font-extrabold'>${studentsCount > 2 ? (studentsCount) : price}</span></p>
              {text && text != '' &&
                <div className='space-y-2'>
                  <p className='font-roboto text-3xl'>Tema a tratar en la clase: </p>
                  <p className='font-extrabold text-sm ml-4'>{text}</p>
                </div>
              }
            </div>
            <br />
            <div className='w-full text-center'>
              <Button onClick={simulateSuccessPayment} className=' bg-black text-white dark:bg-white dark:text-black tracking-wider text-base'>Confirmar ...</Button>
            </div>
            {
              isConfirm && <div>
                <p className='font-roboto text-center text-lg mb-4'>¡Perfecto! Ya podes abonar tu reserva!</p>
                <div id="payment-brick" className='w-full'></div>
              </div>
            }
          </div>

        </Card>
      </section>
    </>
  )
}

export default PreCompraPage



// .no-copy {
//   user-select: none;  /* Evita seleccionar el texto */
// }
// tsx
// Copy code
// <div className="no-copy" onContextMenu={(e) => e.preventDefault()}>
//   {meetLink}
// </div>

//<button onClick={() => window.open(meetLink, "_blank")}>
//  Unirse a la clase
// </button>


// const part1 = "https://meet.google.com/";
// const part2 = "bxq-rtsu-jgv";

// <button onClick={() => window.open(part1 + part2, "_blank")}>
//   Unirse a la clase
// </button>



// declare global {
//   interface Window {
//     MercadoPagoBricks: (options: { locale: string }) => any;
//     MercadoPago: new (publicKey: string, options?: { locale?: string }) => any;
//   }
// }