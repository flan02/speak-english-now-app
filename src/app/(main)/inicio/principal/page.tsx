import H1 from '@/components/html/h1'
import { Button } from '@/components/ui/button'
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
      <p className="">Sabias que...</p>
      <p>proximas clases en (fecha)</p>
      <p>link para unirse a la proxima clase</p>
      <p>codigo de referencia para clase grupal</p>


      <Button asChild variant='default' className='w-full lg:w-auto bg-black text-white btn-dark'>
        <Link href='/inicio/historial'>
          ver historial
        </Link>
      </Button>
    </>

  )
}

export default Principal