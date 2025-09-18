import React from 'react'
import MaxWidthWrapper from '../reutilizable/MaxWidthWrapper'
import { MetodoDePagoBadge } from '../reutilizable/MetodoDePagoBadge'
import { metodos_pago } from '@/lib/types'

type Props = {}



const Section6 = (props: Props) => {
  return (
    <MaxWidthWrapper>
      <h2 className="text-5xl font-bold lg:mb-16 text-center tracking-wider">Información General</h2>
      <article className='text-left space-y-10'>
        <p className='font-bold font-roboto'>Una vez registrado en nuestra plataforma podrás acceder a todas las funcionalidades y beneficios. Recuerda que el registro es gratuito y no pagarás ninguna subscripción, solamente abonas en el momento que realices la reserva de una clase.</p>
        <div className='flex flex-col text-sm'>
          <p className='font-bold px-2'>Podes suscribirte a nuestro boletín para recibir novedades y promociones.</p>
          <div className='flex space-x-2 mt-2 px-2'>
            <input type="email" placeholder='Tu email' className='border rounded-md w-1/3 pl-2 text-gray-400' />
            <input type="submit" value="Subcribirme" className='border rounded-md py-1 px-2 hover:bg-gray-200/70 bg-gray-100 btn-send font-bold' />
          </div>
        </div>
        <p className='font-bold text-sm px-2 font-roboto'>Si tenes consultas sobre nuestro servicio, o necesitas un horario en particular no dudes en contactarnos por aquí o vía whatsapp +11-3057-7799</p>
        <div className='flex flex-col w-1/2 -mt-4 mx-auto space-y-4 font-roboto'>
          <div className='flex flex-col space-x-2 text-sm'>
            <label htmlFor="contact-email" className='font-bold' aria-autocomplete='none'>Email / Teléfono: </label>
            <input type="text" placeholder='' className='border rounded-md py-0.5 w-1/2 pl-2 mt-2 text-gray-400' />
          </div>
          <div className='text-sm'>
            <label htmlFor="contact-message" className='font-bold'>Mensaje: </label><br />
            <textarea name="" id="" rows={6} className='w-full border rounded-md p-1 mt-2 text-gray-400'></textarea>
          </div>
          <input type="submit" value="Enviar" className='border rounded-md py-0.5 w-1/3 mx-auto hover:bg-slate-200/70 bg-slate-100 btn-send font-bold' />
        </div>
      </article>
      <MetodoDePagoBadge title={metodos_pago} color="metodopago text-xs text-yellow-700 bg-yellow-100 border-2 border-yellow-300 rounded-lg" />
    </MaxWidthWrapper>
  )
}

export default Section6
{/* <p>analizar implementar gmail para enviar email a los usuarios en un nuevo footer mas cortito</p> */ }


