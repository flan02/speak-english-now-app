import H1 from '@/components/html/h1'
import { Bot } from 'lucide-react'
import React from 'react'
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
      <div className='flex mt-4 xl:mt-0 2xl:mt-0 space-x-2 xl:space-x-4 2xl:space-x-4 items-end justify-center xl:justify-start 2xl:justify-start'>
        <Bot className='mb-0.5' size={28} />
        <H1 title='Mis Actividades' />
      </div>
      <h2 className='font-roboto font-bold px-4 xl:px-0 2xl:px-0 text-sm xl:text-base 2xl:text-base'>Nuestro tutor IA va a poner a prueba los conocimientos adquiridos en las clases virtuales.</h2>
      <Card className='w-auto xl:w-full 2xl:w-full flex justify-between border-card border py-4 px-4'>
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