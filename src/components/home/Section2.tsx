import React from 'react'
import MaxWidthWrapper from '../reutilizable/MaxWidthWrapper'

type Props = {}

const Section2 = (props: Props) => {
  return (
    <MaxWidthWrapper >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-5xl font-bold mb-8 text-center tracking-wider">Cómo Enseñamos Inglés</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card title="Enfoque Personalizado" description="Clases adaptadas a tu nivel, ritmo y objetivos para aprender de forma eficiente" />
          <Card title="Usamos la Forma Débil" description="Aprende estructuras del idioma de manera natural y práctica, sin memorizar reglas aisladas." />
          <Card title="En Pequeños Grupos" description="Grupos reducidos de hasta 4 personas para garantizar atención personalizada y práctica constante." />
          <Card title="Dinámicas Interactivas" description="Clases virtuales con ejercicios, materiales personalizados y seguimiento de tu progreso." />
        </div>
      </div>
      {/* <article className='border border-red-500 max-w-xl mx-auto space-y-8'>
        <h3 className='uppercase text-2xl font-bold'>acceso total y gratuito a nuestra plataforma de aprendizaje</h3>
        <h3 className='uppercase text-2xl font-bold'>luego de cada clase recibiras una tarea personalizada para reforzar lo aprendido</h3>
      </article> */}
      <div className="max-w-2xl mx-auto mt-8 px-6 py-10 rounded-2xl shadow-lg text-yellow-700 bg-yellow-100 bg-card-main border border-yellow-300 text-center">
        <h2 className="text-lg font-bold tracking-wide">ACCESO TOTAL Y GRATUITO A NUESTRA PLATAFORMA DE APRENDIZAJE</h2>
        <p className="mt-3 text-sm font-medium">LUEGO DE CADA CLASE RECIBIRÁS UNA TAREA PERSONALIZADA PARA REFORZAR LO APRENDIDO</p>
      </div>

    </MaxWidthWrapper>
  )
}

export default Section2



/* COMPONENTS */
function Card({ title, description }: { title: string, description: string }) {
  return (<div className="bg-amber-100/30 space-y-8 hover:bg-amber-100/40 bg-card px-4 py-12 rounded-lg shadow hover:shadow-lg transition">
    <h3 className="text-2xl font-semibold font-geist-mono text-left">{title}</h3>
    <p className='text-left text-sm font-roboto leading-relaxed'>{description}</p>
  </div>)
}