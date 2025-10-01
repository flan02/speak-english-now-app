import H1 from '@/components/html/h1'
import { BookAIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const Reservas = (props: Props) => {
  return (
    <>
      <div className='flex space-x-4 items-end'>
        <BookAIcon className='mb-0.5' />
        <H1 title='Reservas' />
      </div>
    </>
  )
}

export default Reservas