import { auth } from '@/auth'
import H1 from '@/components/html/h1'
import { ArrowLeftCircle, CreditCard } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { getBillingHistory } from './actions'
import { URL_ROUTES } from '@/services/api/routes'
import BillingHistory from '@/components/facturacion/BillingHistory'

type Props = {}

const Facturacion = async (props: Props) => {
  const session = await auth()

  if (!session) {
    return null
  }
  const billingHistory = await getBillingHistory(session.user.id)

  return (
    <>
      <div className='flex mt-4 xl:mt-0 2xl:mt-0 space-x-2 xl:space-x-4 2xl:space-x-4 items-end justify-between xl:justify-between 2xl:justify-between'>
        <div className='flex items-end space-x-2 px-2 lg:px-0'>
          <CreditCard className='mb-0.5 md:mb-1' />
          <H1 title='Facturacion' />
        </div>
        <Link href={`${URL_ROUTES.CONFIG}`} className='underline px-2 lg:px-0 mb-0.5'>
          <ArrowLeftCircle />
        </Link>
      </div>
      <h2 className='font-roboto font-bold px-2 xl:px-0 2xl:px-0 text-xs xl:text-base 2xl:text-base'>
        Aqui tienes un resumen de las clases que has abonado.
      </h2>
      {
        billingHistory && billingHistory.length != 0
          ?
          <BillingHistory billingHistory={billingHistory} />
          : <p>No se encontro ningun pago cargado en tu historial.</p>
      }
    </>
  )
}

export default Facturacion