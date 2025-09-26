import React from 'react'
import MaxWidthWrapper from '../reutilizable/MaxWidthWrapper'
import Calendar from '../reutilizable/Calendar'


type Props = {}

const Section4 = (props: Props) => {



  return (
    <MaxWidthWrapper className='lg:space-y-16'>
      <h2 className="mb-0 text-3xl py-16 lg:text-5xl font-bold lg:mb-16 lg:py-0 text-center tracking-wider">Horario de Reservas (17hs a 21hs)</h2>
      <div className='flex flex-col space-x-2'>
        <article className='min-w-[350px] lg:w-full'>
          <Calendar />
          <div className='py-4'>
            <h6 className='text-xs lg:text-sm text-gray-400'>* Clickea sobre el día para ver la disponibilidad de horarios</h6>
            <h6 className='text-xs lg:text-sm text-gray-400'>** Para reservar tu clase debes primero iniciar sesion en la plataforma</h6>
          </div>
        </article>
      </div>
    </MaxWidthWrapper>
  )
}

export default Section4


