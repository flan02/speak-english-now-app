import { auth } from '@/auth'
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
              {/* <pre className='absolute top-24 right-8 text-xs'>{JSON.stringify(lastClass, null, 2)}</pre> */}
              <section className=''>
                <div className='h-[350px] border border-purple-500'>
                  <p className='px-4'>CLASES ABIERTAS A PARTIR DEL 15 DE DICIEMBRE</p>
                  <p>Dictamos dos clases por semana una separada en tres areas.</p>
                  <p>Gramatica (nivel inicial)</p>
                  <p>Auditivo (nivel intermedio)</p>
                  <p>Conversacional (nivel avanzado)</p>
                  <h6>Selecciona el tipo de clase que quieres tomar: agregar link para pagar y demas</h6>
                </div>
                <article className='flex justify-between'>
                  {
                    lastClass ?
                      <div className='w-full flex justify-around items-center space-x-2 px-4 text-sm font-roboto'>
                        <div className='flex items-center space-x-2'>
                          <h2 className='py-2 underline underline-offset-2'>Siguiente clase:</h2>
                          <p className='pr-4'>{lastClass.startTime.toLocaleString()}</p>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <h2 className='py-2 underline underline-offset-2'>Participantes confirmados:</h2>
                          <p className=''>{lastClass.currentParticipants} de</p>
                          <p className=''>{lastClass.maxParticipants}</p>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <h2 className='py-2 underline underline-offset-2'>Comienza en:</h2>
                          <p className=''>{calcularTiempoRestante(lastClass.startTime)}</p>
                        </div>
                      </div>
                      :
                      <p className='px-4'>No tenes clases programadas</p>
                  }

                </article>
              </section>
            </Card>
            <Card className='w-[30%] border border-card py-8 space-y-8 px-4'>
              <div className='space-y-2'>
                <h2 className="text-2xl text-center font-bold underline">Que es el Ingles... ?</h2>
                <p className='font-roboto text-sm'>El ingles es el idioma global de la comunicacion, la tecnologia y las oportunidades. <span className='font-bold dark:text-yellow-100 text-gray-800'>Aprenderlo</span> es invertir en tu futuro y abrirte al mundo.</p>
              </div>
              <div className='space-y-2'>
                <h2 className="text-2xl text-center font-bold underline">Como aprenderlo... ?</h2>
                <p className="font-roboto text-sm">Aprender inglés no lleva años, lleva decisión.
                  Tu <span className='font-bold dark:text-yellow-100 text-gray-800'>progreso</span> depende de vos, no de un aula. Tu curiosidad es el mejor profesor.</p>
              </div>
              <div className='space-y-2'>
                <h2 className="text-2xl text-center font-bold underline">Como progresar... ?</h2>
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