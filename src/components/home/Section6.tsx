import React from 'react'
import MaxWidthWrapper from '../reutilizable/MaxWidthWrapper'

type Props = {}

const Section6 = (props: Props) => {
  return (
    <MaxWidthWrapper>
      <section>SECTION 6: consultas, suscribirse, solicitar cupon descuento</section>
      <div className='space-y-1'>
        <p className='font-extrabold'>MÉTODOS DE PAGO ACEPTADOS</p>
        <span className='text-orange-400'>MERCADO PAGO | UALA | BRUBANK | TARJETA NARANJA | TRANSFERENCIA BANCARIA | CRIPTOMONEDAS (USDT, BTC, ETH)</span>
      </div>
    </MaxWidthWrapper>
  )
}

export default Section6
{/* <p>analizar implementar gmail para enviar email a los usuarios en un nuevo footer mas cortito</p> */ }