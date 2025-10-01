import H1 from '@/components/html/h1'
import { History } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const historial = (props: Props) => {
  return (
    <>
      <div className='flex space-x-4 items-end'>
        <History className='mb-0.5' />
        <H1 title='Historial' />
      </div>

      <Link href='/inicio/principal' className='underline'>volver</Link>
    </>
  )
}

export default historial