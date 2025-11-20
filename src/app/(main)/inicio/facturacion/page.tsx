import { auth } from '@/auth'
import H1 from '@/components/html/h1'
import { Card } from '@/components/ui/card'
import { ArrowLeftCircle, CreditCard } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { getBillingHistory } from './actions'

type Props = {}

export async function Facturacion(props: Props) {
  const session = await auth()

  if (!session) {
    return null
  }
  const billingHistory = await getBillingHistory(session.user.id)
  return (
    <>
      <div className='flex space-x-4 justify-between items-end'>
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
      <Card className='xl:w-full border border-card mx-1 py-4 px-1 lg:h-screen xl:h-[700px] 2xl:h-[700px]'></Card>

    </>
  )
}

export default Facturacion