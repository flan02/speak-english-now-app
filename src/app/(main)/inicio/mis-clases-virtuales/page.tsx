import H1 from '@/components/html/h1'
import { useIsMobile } from '@/hooks/use-mobile'
import { Computer, PenBox } from 'lucide-react'
import React from 'react'

type Props = {}

const MisClasesVirtuales = (props: Props) => {


  return (
    <>
      <div className='flex space-x-4 items-end lg:mt-0 mt-2'>
        <Computer className='mb-0.5' />
        <H1 title='Mis Clases Virtuales' />
      </div>
      <p>describir las clases tomadas</p>
      <p>activades realizadas</p>
      <p>ver si estan pendientes de pago y o aprobacion</p>
    </>
  )
}

export default MisClasesVirtuales