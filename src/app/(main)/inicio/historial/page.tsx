import H1 from '@/components/html/h1'
import { ArrowLeftCircle, History } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const historial = (props: Props) => {
  return (
    <>
      <div className='flex mt-4 xl:mt-0 2xl:mt-0 space-x-2 xl:space-x-4 2xl:space-x-4 items-end justify-center xl:justify-between 2xl:justify-between'>
        <div className='flex items-end space-x-2'>
          <History className='mb-1' />
          <H1 title='Historial' />
        </div>
        <Link href='/inicio' className='absolute top-28 mt-0.5 right-4 xl:static 2xl:static underline'>
          <ArrowLeftCircle />
        </Link>
      </div>

    </>
  )
}

export default historial