import React from 'react'
import MaxWidthWrapper from '../reutilizable/MaxWidthWrapper'
import { MetodoDePagoBadge } from '../reutilizable/MetodoDePagoBadge'
import { metodos_pago } from '@/lib/types'

type Props = {}

const Section2 = (props: Props) => {
  return (
    <MaxWidthWrapper className=''>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="mb-0 text-3xl py-16 lg:text-5xl font-bold lg:mb-16 lg:py-0 text-center tracking-wider">Cómo Enseñamos Inglés</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 -mt-4 md:mt-0">
          <Card title="Enfoque Personalizado" description="Clases adaptadas a tu nivel, ritmo y objetivos para aprender de forma eficiente" />
          <Card title="En Pequeños Grupos" description="Grupos reducidos de hasta 5 personas para garantizar atención personalizada y práctica constante." />
          <Card title="Dinámicas Interactivas" description="Clases virtuales con ejercicios, materiales personalizados y seguimiento de tu progreso." />
          <Card title="Usamos la Forma Débil" description="Aprende estructuras del idioma de manera natural y práctica, sin memorizar reglas aisladas." />
        </div>

      </div>

      <div className="max-w-2xl mx-auto mt-8 px-6 py-6 lg:py-10 rounded-2xl shadow-lg text-yellow-700 bg-yellow-100 bg-card-main border border-yellow-300 text-center">
        <h2 className="lg:text-lg font-bold lg:tracking-wide">ACCESO TOTAL Y GRATUITO A NUESTRA PLATAFORMA DE APRENDIZAJE</h2>
        <p className="mt-3 text-[10px] lg:text-sm font-medium">LUEGO DE CADA CLASE RECIBIRÁS UNA TAREA PERSONALIZADA PARA REFORZAR LO APRENDIDO</p>


      </div>
      <MetodoDePagoBadge title={metodos_pago} color="metodopago text-[9px] lg:text-xs text-yellow-700 bg-yellow-100 border-2 border-yellow-300 rounded-lg" />
    </MaxWidthWrapper>
  )
}

export default Section2



/* COMPONENTS */
function Card({ title, description }: { title: string, description: string }) {
  return (<div className="bg-amber-100/30 lg:border-none space-y-8 hover:bg-amber-100/40 bg-card px-4 py-6 lg:py-12 rounded-lg shadow hover:shadow-lg transition">
    <h3 className="text-base lg:text-2xl font-semibold font-geist-mono text-left">{title}</h3>
    <p className='text-left text-xs lg:text-sm font-roboto leading-relaxed'>{description}</p>
  </div>)
}