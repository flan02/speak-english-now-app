import React from 'react'
import MaxWidthWrapper from '../reutilizable/MaxWidthWrapper'

type Props = {}

const Section3 = (props: Props) => {
  return (
    <MaxWidthWrapper className='border border-red-500'>
      <h3>SECTION 3: Información sobre clases virtuales y precios, cantidad de alumnos</h3>
      <h4>Dictamos la clase virtual desde nuestra plataforma</h4>
      <p>consulta <a href="#">aquí</a> nuestro cronograma semanal</p>
      <p>reservar clase</p>

      <p>para la UI/UX usaremos FULLCALENDAR !!!</p>
    </MaxWidthWrapper>
  )
}

export default Section3