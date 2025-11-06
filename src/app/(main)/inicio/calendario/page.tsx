import H1 from '@/components/html/h1'
import Calendar from '@/components/reutilizable/Calendar'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Calendar1 } from 'lucide-react'
import React from 'react'

type Props = {}

const Calendario = (props: Props) => {
  return (
    <>
      {/* <div className='flex space-x-4 items-end'> */}
      <div className='flex mt-4 xl:mt-0 2xl:mt-0 space-x-2 xl:space-x-4 2xl:space-x-4 items-end justify-center xl:justify-start 2xl:justify-start'>
        <Calendar1 className='mb-0.5' />
        <H1 title='Calendario' />
      </div>
      <div className='flex flex-col space-x-2'>
        <article className='w-[350px] lg:w-full space-y-8 xl:space-y-0 2xl:space-y-0 lg:space-x-4 lg:flex xl:flex-col 2xl:flex-row flex flex-col'>
          <div className=''>
            <h2 className="mb-4 text-base px-4 xl:px-0 2xl:px-0 xl:text-3xl 2xl:text-3xl font-bold text-left tracking-wider">Horario de Reservas (17hs a 21hs)</h2>
            <Calendar />
          </div>
          <Card className='border border-card h-max mb-6 xl:mb-0 2xl:mb-0 xl:mt-12 2xl:mt-12 xl:mx-auto'>
            <CardTitle className='text-center p-4 lg:text-left lg:p-6'>Instrucciones para reservar tu clase</CardTitle>
            <CardContent>
              <div className='space-y-2'>
                <h6 className='text-xs lg:text-sm text-gray-400'>* Primero clickea sobre los días en el calendario para ver la disponibilidad de horarios</h6>
                <h6 className='text-xs lg:text-sm text-gray-400'>** Luego desde la sección reservas podrás elegir el horario que más te convenga</h6>
              </div>
            </CardContent>
          </Card>
        </article>
      </div>
    </>
  )
}

export default Calendario