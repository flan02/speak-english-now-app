import React from 'react'
import MaxWidthWrapper from '../reutilizable/MaxWidthWrapper'
import Calendar from '../reutilizable/Calendar'
import { ModalDayCalendar } from '../reutilizable/ModalDayCalendar'

type Props = {}

const Section4 = (props: Props) => {
  return (
    <MaxWidthWrapper className='space-y-16'>
      <h2 className="text-5xl font-bold lg:mb-16 text-center tracking-wider">Cronograma de Reservas</h2>
      <div className='flex flex-col space-x-2'>
        <article className='w-full'>
          <Calendar />
          <h6 className='py-4 text-sm text-gray-400'>** Para reservar tu clase debes primero iniciar sesion en la plataforma</h6>
        </article>
      </div>
    </MaxWidthWrapper>
  )
}

export default Section4


