import H1 from '@/components/html/h1'
import { ArrowLeftCircle, History } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const historial = (props: Props) => {
  return (
    <>
      <div className='flex space-x-4 justify-between items-end'>
        <div className='flex items-end space-x-2'>
          <History className='mb-1' />
          <H1 title='Historial' />
        </div>
        <Link href='/inicio/principal' className='underline'>
          <ArrowLeftCircle />
        </Link>
      </div>

    </>
  )
}

export default historial