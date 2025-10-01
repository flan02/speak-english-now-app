import H1 from '@/components/html/h1'
import Calendar from '@/components/reutilizable/Calendar'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Calendar1 } from 'lucide-react'
import React from 'react'

type Props = {}

const Calendario = (props: Props) => {
  return (
    <>
      <div className='flex space-x-4 items-end'>
        <Calendar1 className='mb-0.5' />
        <H1 title='Calendario' />
      </div>
      <div className='flex flex-col space-x-2'>
        <article className='min-w-[350px] lg:w-full lg:space-x-4 lg:flex lg:flex-row flex flex-col'>
          <div className=''>
            <h2 className="mb-4 text-3xl lg:text-xl font-bold text-left tracking-wider">Horario de Reservas (17hs a 21hs)</h2>
            <Calendar />
          </div>
          <Card className='dark:border dark:border-gray-600/30 h-max'>
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