import React from 'react'
import MaxWidthWrapper from '../reutilizable/MaxWidthWrapper'
import AulaVirtual from '../../../public/clase-aula-virtual.jpg'
import AulaVirtual2 from '../../../public/clase-aula-virtual2.jpg'
import { ModalidadCard } from '../reutilizable/ModalidadCard'
import { paragraph, paragraph2 } from '@/lib/types'

type Props = {}




const Section3 = (props: Props) => {
  return (
    <MaxWidthWrapper className=''>
      <h2 className='text-5xl font-bold lg:mb-16 text-center tracking-wider'>Formato De Clases</h2>
      <ModalidadCard image={AulaVirtual} paragraph={paragraph} order={false} />
      <ModalidadCard image={AulaVirtual2} paragraph={paragraph2} order={true} />
    </MaxWidthWrapper>
  )
}

export default Section3



