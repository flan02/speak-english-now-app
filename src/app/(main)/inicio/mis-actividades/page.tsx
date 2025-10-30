import H1 from '@/components/html/h1'
import { Bot, PenBox } from 'lucide-react'
import React from 'react'

import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Session } from "next-auth"
import { auth } from '@/auth'
import AllTasks from '@/components/mis-actividades/AllTasks'
import { getAllClasses } from '../mis-clases-virtuales/actions'
type Props = {}

const MisActividades = async (props: Props) => {
  const session: Session | null = await auth()
  const all_tasks = await getAllClasses(session?.user?.id!)
  return (
    <>
      <div className='flex space-x-4 items-end'>
        <Bot className='mb-0.5' size={28} />
        <H1 title='Mis Actividades' />
      </div>
      <h2 className='font-roboto font-bold text-base'>Nuestro tutor IA va a poner a prueba los conocimientos adquiridos en las clases virtuales.</h2>
      <Card className='w-full flex justify-between border-card border py-4 px-4'>
        {
          session?.user?.id
            ? <AllTasks all_tasks={all_tasks} />
            : null
        }
      </Card>
    </>
  )
}

export default MisActividades