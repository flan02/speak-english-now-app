import { auth } from '@/auth'
import H1 from '@/components/html/h1'
import { Card } from '@/components/ui/card'
import { Session } from "next-auth"
import { Computer } from 'lucide-react'
import React from 'react'

type Props = {}

const MisClasesVirtuales = async (props: Props) => {

  const session: Session | null = await auth()

  return (
    <>
      <div className='flex space-x-4 items-end lg:mt-0 mt-2'>
        <Computer className='mb-0.5' />
        <H1 title='Mis Clases Virtuales' />
      </div>
      <h2 className='font-roboto font-bold text-base'>Aqui veras las clases virtuales que has tomado y las clases futuras que tengas reservadas</h2>
      <Card className='w-full border border-card py-4 px-4 h-screen'>
        {
          session?.user.id
            ? <MisClasesVirtuales session={session} />
            : null
        }
      </Card>
    </>
  )
}





export default MisClasesVirtuales