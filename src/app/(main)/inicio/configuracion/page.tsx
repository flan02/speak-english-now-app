import H1 from '@/components/html/h1'
import { Settings } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Configuracion = (props: Props) => {
  return (
    <>
      <div className='flex space-x-4 items-end lg:mt-0 mt-2'>
        <Settings className='mb-0.5' />
        <H1 title='Configuracion' />
      </div>

      <Link href='/inicio/facturacion'>ver facturacion</Link>
    </>
  )
}

export default Configuracion