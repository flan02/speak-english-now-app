import { auth } from '@/auth'
import H1 from '@/components/html/h1'
import { Card } from '@/components/ui/card'
import { ArrowLeftCircle, CreditCard } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { getBillingHistory } from './actions'
import { toArgentinaTZ } from '@/lib/utils'

type Props = {}

const Facturacion = async (props: Props) => {
  const session = await auth()

  if (!session) {
    return null
  }
  const billingHistory = await getBillingHistory(session.user.id)

  //console.log("All billingHistory", billingHistory);
  return (
    <>
      {/* <div className='flex space-x-4 justify-between items-end'> */}
      <div className='flex mt-4 xl:mt-0 2xl:mt-0 space-x-2 xl:space-x-4 2xl:space-x-4 items-end justify-center xl:justify-between 2xl:justify-between'>
        <div className='flex items-end space-x-2'>
          <CreditCard className='mb-1' />
          <H1 title='Facturacion' />
        </div>
        <Link href='/inicio/configuracion' className='underline'>
          <ArrowLeftCircle />
        </Link>
      </div>
      <h2 className='font-roboto font-bold px-2 xl:px-0 2xl:px-0 text-xs xl:text-base 2xl:text-base'>
        Aqui tienes un resumen de las clases que has abonado.
      </h2>
      {
        billingHistory && billingHistory.length != 0
          ?
          <Card className='xl:w-full border border-card mx-1 py-4 px-1 lg:h-screen xl:h-[700px] 2xl:h-[700px]'>
            {
              billingHistory.map((bill, index) => (
                <div key={index} className='flex flex-col space-y-2'>
                  <p><span className='font-bold'>Fecha de pago:</span> { }</p>
                  <p><span className='font-bold'>Monto:</span> {`${toArgentinaTZ(bill.createdAt)}`}</p>
                  <p><span className='font-bold'>Metodo de pago:</span> mercadopago</p>
                  <p><span className='font-bold'>Nro. de orden:</span> {bill.preferenceId}</p>
                  <p><span className='font-bold'>Precio:</span> {bill.preferenceId}</p>
                  <p><span className='font-bold'>Cantidad de estudiantes:</span> {bill.maxParticipants}</p>
                  <hr className='my-2' />
                </div>
              ))
            }
          </Card>
          : <p>No se encontro ningun pago cargado en tu historial.</p>
      }

    </>
  )
}

export default Facturacion