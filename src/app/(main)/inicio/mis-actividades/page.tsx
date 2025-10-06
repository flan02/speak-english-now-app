import H1 from '@/components/html/h1'
import { Bot, PenBox } from 'lucide-react'
import React from 'react'

type Props = {}

const MisActividades = (props: Props) => {
  return (
    <>
      <div className='flex space-x-4 items-end'>
        <Bot className='mb-0.5' size={28} />
        <H1 title='Mis Actividades' />
      </div>

    </>
  )
}

export default MisActividades