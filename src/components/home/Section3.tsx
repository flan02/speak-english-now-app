import React from 'react'
import MaxWidthWrapper from '../reutilizable/MaxWidthWrapper'
import InglesImage2 from '../../../public/inglesimage2.png'
import InglesImage1 from '../../../public/inglesimage1.png'
import { ModalidadCard } from '../reutilizable/ModalidadCard'
import { paragraph, paragraph2 } from '@/lib/types'

type Props = {}

const Section3 = (props: Props) => {
  return (
    <MaxWidthWrapper className=''>
      <h2 className='mb-0 text-3xl py-16 lg:text-5xl font-bold lg:mb-16 lg:py-0 text-center tracking-wider'>Formato De Clases</h2>
      <ModalidadCard image={InglesImage2} paragraph={paragraph} order={false} />
      <ModalidadCard image={InglesImage1} paragraph={paragraph2} order={true} />
    </MaxWidthWrapper>
  )
}

export default Section3



