import { auth } from '@/auth'
import H1 from '@/components/html/h1'
import AllClasses from '@/components/mis-clases-virtuales/AllClasses'
import { Card } from '@/components/ui/card'
import { ArrowLeftCircle, History } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const historial = async (props: Props) => {
  const session = await auth()
  {/* lg:h-screen xl:h-[700px] 2xl:h-[700px] */ }
  return (
    <>
      <div className='flex mt-4 xl:mt-0 2xl:mt-0 space-x-2 xl:space-x-4 2xl:space-x-4 items-end justify-center xl:justify-between 2xl:justify-between'>
        <div className='flex items-end space-x-2'>
          <History className='mb-1' />
          <H1 title='Historial' />
        </div>
        <Link href='/inicio' className='absolute top-28 mt-0.5 right-4 xl:static 2xl:static underline'>
          <ArrowLeftCircle />
        </Link>
      </div>
      <h2 className='font-roboto font-bold px-2 xl:px-0 2xl:px-0 text-xs xl:text-base 2xl:text-base'>
        Consulta el historial de las clases virtuales a las que has asistido.
      </h2>

      <Card className='xl:w-full border border-card mx-1 py-4 px-1 '>
        {
          session?.user.id
            ? <AllClasses session={session} type={"all"} />
            : null
        }
      </Card>
    </>
  )
}

export default historial