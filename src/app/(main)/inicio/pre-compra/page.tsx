'use client'
import H1 from '@/components/html/h1';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { KY, Method } from '@/services/api';
import { storePaymentData } from '@/zustand/store';
import { initMercadoPago } from '@mercadopago/sdk-react';
import { ArrowLeftCircle, CreditCard, PenTool } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import pricing from '@/config/pricing.json';
import { processMpPayment, simulateSuccessPayment } from '@/services/api/clients';
import { API_ROUTES, URL_ROUTES } from '@/services/api/routes';
import { formattedDate } from '@/lib/utils';

type Props = {}

const PreCompraPage = () => {
  const { isGroupClass, selectedDate, studentsCount, price, scheduledTime, text } = storePaymentData();
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

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
          <div className='space-y-4 py-8'>
            <div className='space-y-6 xl:space-y-8 2xl:space-y-8 px-1 xl:px-8 2xl:px-8 font-roboto text-sm xl:text-3xl 2xl:text-3xl'>
              <p className=''>Tipo de clase: <span className='font-extrabold capitalize'>{isGroupClass ? 'grupal' : 'individual'}</span></p>
              <p className=''>Cantidad de estudiantes: <span className='font-extrabold'>{studentsCount == 0 ? 1 : Math.floor((studentsCount) / pricing.groupPrice)}</span></p>
              <p className=''>Fecha: <span className='font-extrabold'>{formattedDate(selectedDate!)}</span></p>
              <p className=''>Hora: <span className='font-extrabold'>{`${scheduledTime?.start?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} - ${scheduledTime?.end?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`} hs</span></p>
              <p className=''>Precio: <span className='font-extrabold'>${studentsCount > 2 ? (studentsCount) : price}</span></p>
              {text && text != '' &&
                <div className='space-y-4'>
                  <p className='font-roboto text-sm xl:text-3xl 2xl:text-3xl'>Tema a tratar en la clase: </p>
                  <p className='font-extrabold text-sm lg:text-base xl:text-base ml-4 mt-2 xl:mt-0 2xl:mt-0'>{text}</p>
                </div>
              }
            </div>
            <br />
            <div className='w-full text-center -mt-2'>
              {/* <Button onClick={() => simulateSuccessPayment({ setIsLoading, scheduledTime, isGroupClass, studentsCount, text, price })} className=' bg-highlight tracking-wider text-xs xl:text-sm 2xl:text-sm'>Confirmar ...</Button> */}
              <Button onClick={() => processMpPayment({ setIsLoading, scheduledTime, isGroupClass, studentsCount, text, price, setIsConfirm })} className=' bg-highlight tracking-wider text-xs xl:text-sm 2xl:text-sm'>Confirmar ...</Button>
            </div>
            {
              isConfirm && <div>
                <p className='font-roboto text-center text-sm lg:text-base mb-1'>¡Perfecto! Ya podes abonar tu reserva!</p>
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