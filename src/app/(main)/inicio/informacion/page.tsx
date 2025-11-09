import { ArrowLeftCircle } from 'lucide-react'
import Link from 'next/link'

type Props = {}

const InformacionPage = async (props: Props) => {
  return (
    <div className='py-12 space-y-8'>
      <div className="flex justify-end mr-8">
        <Link href='/inicio/principal' className='underline'>
          <ArrowLeftCircle />
        </Link>
      </div>
      <h1 className='font-bold text-xl mb-8 text-center'>Informacion sobre las clases abiertas</h1>
      <div className="space-y-6 font-roboto border border-card rounded-md px-3 py-10 font-bold text-sm leading-6 xl:text-base 2xl:text-base xl:px-8 xl:py-8 2xl:px-8 2xl:py-10 xl:tracking-wider 2xl:tracking-wider text-left xl:text-justify">
        <p>Las clases abiertas son sesiones virtuales en vivo dentro de la plataforma que se llevaran a cabo los dias miercoles y sabados a partir del 15 de diciembre.
          Estas clases estan diseñadas para brindar la oportunidad de aprender a estudiar el idioma de forma autodidacta.</p>
        <p>Cada clase tendra una duracion de 90 minutos y se enfocara en diferentes aspectos del aprendizaje del ingles, separado en distintos niveles: La gramatica del idioma basica y avanzada,
          produccion de textos. Nivel Intermedio enfocado en la comprension auditiva, entendimiento de peliculas, conversaciones y capacidad lectora.
          Nivel avanzado enfocado en la fluidez al hablar y la expresion oral con contracciones comunes.</p>
        <p>Al finalizar cada clase, los asistentes recibiran un examen en la seccion de actividades para evaluar lo aprendido durante la sesion.
          Estos examenes estaran diseñados para medir el progreso de los estudiantes y proporcionar retroalimentacion sobre areas de mejora.</p>
        <p>Para participar en cada clases abierta, los asistentes deben inscribirse previamente a traves de la plataforma para reservar su lugar el precio de cada clase es $5000 ARS
          y el room estara limitado a 100 participantes.
          Una vez inscriptos, en la seccion <a href='/inicio/mis-clases-virtuales' className='underline underline-offset-2'>clases virtuales</a> tendran la informacion de la clase y el codigo unico de acceso.</p>
        <p>Las clases abiertas son una excelente oportunidad para que personas de todas las edades practiquen y mejoren sus habilidades en ingles a un bajo costo, ademas de recibir orientacion
          de como aprender ingles de manera autodidacta. ¡Esperamos verlos en clase!</p>
      </div>

    </div>
  )
}

export default InformacionPage