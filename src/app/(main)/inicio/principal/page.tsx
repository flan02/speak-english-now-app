import H1 from '@/components/html/h1'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Home, Trophy } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { getLastClass, getTotalClass } from './actions'
import { calcularTiempoRestante } from '@/lib/utils'

type Props = {}

const Principal = async (props: Props) => {
  const response = await getTotalClass()
  const lastClass = await getLastClass()
  return (
    <>
      <div className='flex space-x-4 items-end'>
        <Home className='mb-0.5' />
        <H1 title='Principal' />
      </div>
      <section className='space-y-4'>

        <Card className='w-full border border-card py-8 space-y-4 px-4'>
          <div className='flex space-x-1'>

            <Card className='w-full border border-card space-y-4 h-[500px]'>
              <div className='bg-black/80 dark:bg-yellow-50 dark:text-black text-yellow-50 rounded-md py-4 pl-6 font-bold text-lg tracking-wider'>Proximos Eventos</div>
              <section className='font-roboto'>
                <div className='h-[350px] mb-4 xl:p-2 2xl:p-4 space-y-4'>
                  <h3 className='font-roboto xl:text-xl 2xl:text-2xl font-bold tracking-wider'>CLASES ABIERTAS A PARTIR DEL 15 DE DICIEMBRE</h3>
                  <div className='xl:px-2 2xl:px-4 xl:text-base 2xl:text-lg space-y-2'>
                    <div className='flex items-center space-x-2'>
                      <p className='font-roboto'>Los dias miercoles y sabados se dictaran clases virtuales de 90 minutos en un room para un grupo limitado de asistentes y luego recibiran un examen
                        en la seccion actividades para evaluar lo aprendido
                        &nbsp;<Link href='/inicio/informacion' className='text-xs text-blue-500 hover:text-blue-600 underline'>ver mas ...</Link>
                      </p>

                    </div>
                    <p className='xl:mt-4 xl:mb-6 2xl:mt-0 2xl:mb-6'>Habra tres diferentes topicos segun el nivel de ingles de cada usuario:</p>
                    <div className='space-x-2 flex items-center'>
                      <p className='bg-black/80 whitespace-nowrap font-bold xl:py-1 xl:px-2 2xl:py-2 2xl:px-4 rounded-md text-white dark:bg-gray-100 dark:text-black'>Gramatica (inicial)</p>
                      <span className='font-roboto xl:text-sm 2xl:text-base'>Se enfocara en la estructura basica, avanzada del idioma y la composicion de texto</span>
                    </div>
                    <div className='space-x-2 flex items-center'>
                      <p className='bg-black/80 whitespace-nowrap font-bold xl:py-1 xl:px-2 2xl:py-2 2xl:px-4 rounded-md text-white dark:bg-gray-100 dark:text-black'>Auditivo (intermedio)</p>
                      <span className='font-roboto xl:text-sm 2xl:text-base'>El punto de aprendizaje sera la comprension auditiva, el entendimiento de peliculas, conversaciones y la capacidad lectora</span>
                    </div>
                    <div className='space-x-2 flex items-center'>
                      <p className='bg-black/80 whitespace-nowrap font-bold xl:py-1 xl:px-2 2xl:py-2 2xl:px-4 rounded-md text-white dark:bg-gray-100 dark:text-black'>Conversacional (avanzado)</p>
                      <span className='font-roboto xl:text-sm 2xl:text-base'>La importancia estara enfocada en la fluidez al hablar y la expresion oral con contracciones comunes</span>
                    </div>

                  </div>
                </div>
                <article className='flex justify-between'>
                  {
                    lastClass && new Date(lastClass.endTime) > new Date() ?
                      // lastClass ?
                      <div className='w-full flex justify-around items-center space-x-2 xl:px-2 xl:text-xs 2xl:px-4 2xl:text-sm font-roboto border border-card mx-4'>
                        <div className='flex items-center space-x-2'>
                          <h2 className='py-2 underline underline-offset-2'>Siguiente clase:</h2>
                          <p className='pr-4'>{lastClass.startTime.toLocaleString()}</p>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <h2 className='py-2 underline underline-offset-2'>Participantes confirmados:</h2>
                          <p className='xl:text-xs 2xl:text-sm'>{lastClass.currentParticipants} de</p>
                          <p className='-ml-0.5'>{lastClass.maxParticipants}</p>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <h2 className='py-2 underline underline-offset-2'>Comienza en:</h2>
                          <p className=''>{calcularTiempoRestante(lastClass.startTime)}</p>
                        </div>
                      </div>
                      :
                      <p className='px-6 py-2 font-roboto text-sm mx-4 border border-card w-full'><span className='underline'>Siguiente clase</span>: &nbsp;No tenes clases programadas</p>
                  }

                </article>
              </section>
            </Card>
            <Card className='w-[30%] border border-card py-8 xl:space-y-3 2xl:space-y-8 px-4'>
              <div className='space-y-2'>
                <h2 className="xl:text-lg 2xl:text-2xl text-center font-bold underline">Que es el Ingles... ?</h2>
                <p className='font-roboto text-sm'>El ingles es el idioma global de la comunicacion, la tecnologia y las oportunidades. <span className='font-bold dark:text-yellow-100 text-gray-800'>Aprenderlo</span> es invertir en tu futuro y abrirte al mundo.</p>
              </div>
              <div className='space-y-2'>
                <h2 className="xl:text-lg 2xl:text-2xl text-center font-bold underline">Como aprenderlo... ?</h2>
                <p className="font-roboto text-sm">Aprender inglés no lleva años, lleva decisión.
                  Tu <span className='font-bold dark:text-yellow-100 text-gray-800'>progreso</span> depende de vos, no de un aula. Tu curiosidad es el mejor profesor.</p>
              </div>
              <div className='space-y-2'>
                <h2 className="xl:text-lg 2xl:text-2xl text-center font-bold underline">Como progresar... ?</h2>
                <p className="font-roboto text-sm">La clave está en la práctica constante y en no tener miedo a cometer errores. Cada error es una oportunidad para aprender y mejorar.</p>
              </div>
            </Card>
          </div>

          <Card className='w-full border border-card py-4 space-y-4 px-4 flex flex-col space-x-4'>
            <div className='flex space-x-2 justify-center'>
              <h3 className='font-bold text-base font-roboto'>TOTAL CLASES COMPLETADAS: &nbsp; {response?.totalClasses}</h3>

              <Trophy fill='#FFD700' color='#FFD700' size={20} className='mt-0.5' />
            </div>
            <Button asChild variant='default' className='mx-auto lg:w-min tracking-wider font-bold bg-black text-white btn-dark'>
              <Link href='/inicio/historial'>
                ver historial
              </Link>
            </Button>
          </Card>
        </Card>
        <br /><br /><br />
      </section>
    </>

  )
}

export default Principal