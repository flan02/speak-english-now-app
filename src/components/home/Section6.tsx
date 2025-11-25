import MaxWidthWrapper from '../reutilizable/MaxWidthWrapper'
import { MetodoDePagoBadge } from '../reutilizable/MetodoDePagoBadge'
import { metodos_pago } from '@/lib/types'
import FormInquiry from './FormInquiry'
import FormNewsletter from './FormNewsletter'

type Props = {}

const Section6 = (props: Props) => {


  return (
    <MaxWidthWrapper className='lg:space-y-16'>
      <h2 className="mb-0 text-3xl pt-16 pb-8 lg:text-5xl font-bold lg:mb-16 lg:py-0 text-center tracking-wider">Información General</h2>
      <h3 className='text-xs lg:text-base text-left px-1 font-roboto'>
        Una vez registrado en nuestra plataforma podras acceder a todas las funcionalides y beneficios. Recuerda que el registro es gratuito
        y no pagaras ninguna suscripcion mensual, solamente abonas en el momento que realices la reserva de una clase.
      </h3>
      <article className='flex flex-col space-y-6 -mt-6'>
        <FormInquiry />
        <FormNewsletter />
      </article>
      <br />
      <MetodoDePagoBadge title={metodos_pago} color="metodopago text-[9px] lg:text-xs text-yellow-700 bg-yellow-100 border-2 border-yellow-300 rounded-lg" margin="-ml-2" />
    </MaxWidthWrapper>
  )
}

export default Section6


