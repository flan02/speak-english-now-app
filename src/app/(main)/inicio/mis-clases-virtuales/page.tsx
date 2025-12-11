import { auth } from '@/auth'
import H1 from '@/components/html/h1'
import { Card } from '@/components/ui/card'
import { Session } from "next-auth"
import { Computer } from 'lucide-react'
import React from 'react'
import AllClasses from '@/components/mis-clases-virtuales/AllClasses'
import GetCode from '@/components/mis-clases-virtuales/GetCode'


type Props = {}

const MisClasesVirtuales = async (props: Props) => {

  const session: Session | null = await auth()
  {/* h-[500px] xl:h-[700px] 2xl:h-[700px] */ }

  return (
    <>
      <div className='flex space-x-4 items-end lg:mt-0 mt-2 ml-2 md:ml-0'>
        <Computer className='mb-0.5' />
        <H1 title='Mis Clases Virtuales' />
      </div>
      <h2 className='font-roboto font-bold px-2 xl:px-0 2xl:px-0 text-xs xl:text-base 2xl:text-base'>Aqui veras las clases virtuales que tengas reservadas. El boton para unirse a la clase aparecera 60 minutos antes de que comience la clase.</h2>
      <GetCode />

      <Card className='xl:w-full border border-card mx-1 py-4 px-1 mb-4 md:mb-0'>
        {
          session?.user.id
            ? <AllClasses session={session} type={"upcoming"} />
            : null
        }
      </Card>
    </>
  )
}

export default MisClasesVirtuales