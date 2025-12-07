'use client'
import H1 from '@/components/html/h1';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { storePaymentData } from '@/zustand/store';
import { ArrowLeftCircle, CreditCard, PenTool } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react'
import { processMpPayment, simulateSuccessPayment } from '@/services/api/clients';
import { URL_ROUTES } from '@/services/api/routes';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {}

const PreCompraPage = () => {
  const { isGroupClass, studentsCount, price, scheduledTime, text } = storePaymentData();
  const [isLoading, setIsLoading] = useState(false);
  // const [isConfirm, setIsConfirm] = useState(false);

  const start = useMemo(() => {
    if (!scheduledTime?.start) return null;
    return scheduledTime.start instanceof Date
      ? scheduledTime.start
      : new Date(scheduledTime.start);
  }, [scheduledTime?.start]);

  const end = useMemo(() => {
    if (!scheduledTime?.end) return null;
    return scheduledTime.end instanceof Date
      ? scheduledTime.end
      : new Date(scheduledTime.end);
  }, [scheduledTime?.end]);

  // ---------- 🔥 Formateo seguro ----------
  const formattedDate = useMemo(() => {
    return start?.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }, [start]);

  const formattedStartTime = useMemo(() => {
    return start?.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })

  }, [start]);

  const formattedEndTime = useMemo(() => {
    return end
      ? end.toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      : "-";
  }, [end]);
  return (
    <>
      <div className='flex px-1 xl:px-0 2xl:px-0 mt-4 xl:mt-0 2xl:mt-0 space-x-2 xl:space-x-4 2xl:space-x-4 items-end justify-between xl:justify-between 2xl:justify-between'>
        <div className='flex items-end space-x-2 ml-1'>
          <CreditCard className='mb-0.5' />
          <H1 title='Verifica tu reserva' />
        </div>
        <Link href={URL_ROUTES.RESERVAS} className='absolute top-28 mt-0.5 right-4 xl:static 2xl:static underline'>
          <ArrowLeftCircle />
        </Link>
      </div>
      <article className='flex space-x-1 items-center xl:items-end 2xl:items-end px-2 xl:px-0 2xl:px-0'>
        <PenTool className='px-1 xl:px-0 2xl:px-0' />
        <h2 className='font-roboto uppercase font-bold text-xs'>Esta es la información de la clase a reservar:</h2>
      </article>
      <section className="w-full max-w-6xl mx-auto px-1 xl:px-4 2xl:px-4 py-2">

        <Card className='w-full h-[650px] border border-card py-4 px-4'>
          <div className='space-y-4 py-4 lg:py-8'>
            <div className='space-y-6 xl:space-y-8 2xl:space-y-8 px-1 xl:px-8 2xl:px-8 font-roboto text-sm xl:text-3xl 2xl:text-3xl'>
              {
                scheduledTime ? <p className='h-4 lg:h-8'>Tipo de clase: <span className='font-extrabold capitalize'>{isGroupClass ? 'grupal' : 'individual'}</span></p>
                  : <Skeleton className='w-full h-4 lg:h-8 rounded-md animate-pulse bg-gray-200 skeleton-bg-dark' />
              }
              {
                studentsCount && formattedDate
                  ? <p className='h-4 lg:h-8'>Cantidad de estudiantes: <span className='font-extrabold'>{studentsCount}</span></p>
                  : <Skeleton className='w-full h-4 lg:h-8 rounded-md animate-pulse bg-gray-200 skeleton-bg-dark' />
              }
              {
                scheduledTime && formattedDate
                  ? <p className='h-4 lg:h-8'>Fecha: <span className='font-extrabold'>{formattedDate}</span></p>
                  : <Skeleton className='w-full h-4 lg:h-8 rounded-md animate-pulse bg-gray-200 skeleton-bg-dark' />
              }

              {
                scheduledTime && formattedStartTime && formattedEndTime
                  ? <p className='h-4 lg:h-8'>Hora: <span className='font-extrabold'>{`${formattedStartTime} - ${formattedEndTime}`} hs</span></p>
                  : <Skeleton className='w-full h-4 lg:h-8 rounded-md animate-pulse bg-gray-200 skeleton-bg-dark' />
              }
              {
                price && formattedDate
                  ? <p className='h-4 lg:h-8'>Precio: <span className='font-extrabold'>${price}</span></p>
                  : <Skeleton className='w-full h-4 lg:h-8 rounded-md animate-pulse bg-gray-200 skeleton-bg-dark' />
              }
              {
                text && text != '' ?
                  <div className='space-y-4 h-14 lg:h-20'>
                    <p className='font-roboto text-sm xl:text-3xl 2xl:text-3xl'>Tema a tratar en la clase: </p>
                    <p className='truncate font-extrabold text-xs lg:text-base xl:text-base ml-4 mt-2 xl:mt-0 2xl:mt-0'>{text}</p>
                  </div>
                  : <Skeleton className='w-full h-14 lg:h-20 rounded-md animate-pulse bg-gray-200 skeleton-bg-dark' />
              }
            </div>
            <br />
            {
              scheduledTime && formattedDate
                ? <div className='w-full text-center -mt-2'>
                  <Button
                    onClick={() => processMpPayment({ setIsLoading, scheduledTime, isGroupClass, studentsCount, text, price, })}
                    className='inline-flex items-center justify-center bg-[#00A6FF] text-white font-semibold px-16 py-6 rounded-md shadow-md transition text-sm lg:text-base hover:bg-[#0094e6] active:bg-[#007bbf]'>
                    <img src="/mp-logo-removebg-preview.png" className='size-6 lg:size-8 bg-white rounded-full' />
                    Pagar con Mercado Pago
                  </Button>
                </div>
                : <Skeleton className='w-full h-12 -mt-2 rounded-md animate-pulse bg-gray-200 skeleton-bg-dark' />
            }
            <h6 className='text-[11px] lg:text-sm lg:text-center'>Luego de abonar la clase MercadoPago te redirigira de nuevo a la pagina de confirmacion de nuestra aplicacion.</h6>
          </div>

        </Card>


      </section>
    </>
  )
}

export default PreCompraPage