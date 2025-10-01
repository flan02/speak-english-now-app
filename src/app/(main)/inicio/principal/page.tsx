import H1 from '@/components/html/h1'
import { Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Principal = (props: Props) => {
  return (
    <>
      <div className='flex space-x-4 items-end'>
        <Home className='mb-0.5' />
        <H1 title='Principal' />
      </div>
      <p className="">Sabias que...</p>
      <p>proximas clases en (fecha)</p>
      <p>link para unirse a la proxima clase</p>
      <p>codigo de referencia para clase grupal</p>
      <Link href='/inicio/historial' className='underline'>Ver historial</Link>
    </>

  )
}

export default Principal