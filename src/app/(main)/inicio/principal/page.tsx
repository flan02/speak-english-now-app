import H1 from '@/components/html/h1'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Principal = (props: Props) => {
  return (
    <>
      <div className='flex space-x-4 items-end'>
        <Home className='mb-0.5' />
        <H1 title='Principal' />
      </div>
      <section className='space-y-4'>

        <Card className='w-full h-screen border border-card py-8 space-y-4 px-4'>
          <div className='flex space-x-1'>

            <Card className='w-full border border-card py-4 space-y-4 px-4'>
              <p>proximas clases en (fecha)</p>
              <p>link para unirse a la proxima clase</p>
              <p>codigo de referencia para clase grupal</p>
              <p>crear una ruta solo para la clase virtual generada, deberia tener ruta dinamica... revisar</p>
              <p>analizar si crear otra ruta en el side bar, para el acceso a la grabacion de las clases, se removeran en 7 dias </p>
            </Card>
            <Card className='w-[20%] border border-card py-4 space-y-4 px-4'>
              <p className="">Sabias que...</p>
            </Card>
          </div>
          <Card className='w-full border border-card py-4 space-y-4 px-4 flex space-x-4'>
            <div>
              <h3>TOTAL CLASES COMPLETADAS: 0</h3>
            </div>
            <Button asChild variant='default' className='w-full lg:w-auto bg-black text-white btn-dark'>
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