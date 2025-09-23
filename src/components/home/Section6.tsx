import React from 'react'
import MaxWidthWrapper from '../reutilizable/MaxWidthWrapper'
import { MetodoDePagoBadge } from '../reutilizable/MetodoDePagoBadge'
import { metodos_pago } from '@/lib/types'

type Props = {}



const Section6 = (props: Props) => {
  return (
    <MaxWidthWrapper className='lg:space-y-16'>
      <h2 className="mb-0 text-3xl pt-16 pb-8 lg:text-5xl font-bold lg:mb-16 lg:py-0 text-center tracking-wider">Información General</h2>
      <article className='text-left space-y-10'>
        <p className='font-bold font-roboto text-xs lg:text-base'>Una vez registrado en nuestra plataforma podrás acceder a todas las funcionalidades y beneficios. Recuerda que el registro es gratuito y no pagarás ninguna subscripción, solamente abonas en el momento que realices la reserva de una clase.</p>
        <div className='flex flex-col space-y-2'>
          <p className='font-bold px-2 text-xs lg:text-base'>Podes suscribirte a nuestro boletín para recibir novedades y promociones.</p>
          <div className='flex space-x-2 mt-2 px-2'>
            <input type="email" placeholder='Tu email' className='border rounded-md w-1/2 text-xs lg:text-base lg:w-1/3 pl-2 text-gray-400' />
            <input type="submit" value="Subcribirme" className='border rounded-md text-xs lg:text-base py-1 px-2 hover:bg-gray-200/70 bg-gray-100 btn-send font-bold' />
          </div>
        </div>
        <p className='font-bold text-xs lg:text-sm px-2 font-roboto'>Si tenes consultas sobre nuestro servicio, o necesitas un horario en particular no dudes en contactarnos por aquí o vía whatsapp +11-3057-7799</p>
        <div className='flex flex-col w-1/2 -mt-2 lg:mt-4 mx-auto space-y-4 font-roboto min-w-[350px] lg:w-full'>
          <div className='flex flex-col space-x-2 text-sm'>
            <label htmlFor="contact-email" className='font-bold' aria-autocomplete='none'>Email / Teléfono: </label>
            <input type="text" placeholder='Email/Teléfono' className='min-w-[250px] border rounded-md py-1 lg:py-0.5 w-1/2 pl-2 mt-2 text-xs lg:text-base text-gray-400' />
          </div>
          <div className='text-sm'>
            <label htmlFor="contact-message" className='font-bold'>Mensaje: </label><br />
            <textarea name="" id="" rows={6} className='w-[330px] lg:w-1/2 border rounded-md p-1 mt-2 text-gray-400'></textarea>
          </div>
          <input type="submit" value="Enviar" className='border rounded-md py-0.5 w-1/3 lg:w-1/4 mx-auto hover:bg-slate-200/70 bg-slate-100 btn-send font-bold' />
        </div>
      </article>
      <MetodoDePagoBadge title={metodos_pago} color="metodopago text-[9px] lg:text-xs text-yellow-700 bg-yellow-100 border-2 border-yellow-300 rounded-lg" />
    </MaxWidthWrapper>
  )
}

export default Section6
{/* <p>analizar implementar gmail para enviar email a los usuarios en un nuevo footer mas cortito</p> */ }


