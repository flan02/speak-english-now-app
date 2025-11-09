import H1 from '@/components/html/h1'
import { ArrowLeftCircle, CreditCard } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Facturacion = (props: Props) => {
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

    </>
  )
}

export default Facturacion