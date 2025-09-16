import React from 'react'
import MaxWidthWrapper from '../reutilizable/MaxWidthWrapper'

type Props = {}

const Section3 = (props: Props) => {
  return (
    <MaxWidthWrapper className='border border-green-400'>
      <h2>Informacion precios, modalidad virtual (ver google meet, zoom, teams, plataformas)</h2>
      <h3>SECTION 3: Información sobre clases virtuales y precios, cantidad de alumnos</h3>
      <h4>Dictamos la clase virtual desde nuestra plataforma</h4>
      <p>consulta <a href="#">aquí</a> nuestro cronograma semanal</p>
      <p>reservar clase</p>
      <p>formas de pago (crear otro marque rectangular mostrando las formas de transferencia, uala, mcdo pago, brubank, transferencia bancaria, crypto usdt, btc, eth)</p>
      <p>analizar implementar gmail para enviar email a los usuarios</p>
    </MaxWidthWrapper>
  )
}

export default Section3