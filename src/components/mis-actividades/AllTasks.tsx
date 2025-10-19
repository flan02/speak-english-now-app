import Image from 'next/image'
import React from 'react'
import { Card } from '../ui/card'
import Robot from '../../../public/robot.png'
import { Session } from "next-auth"
import { getAllClasses } from '@/app/(main)/inicio/mis-clases-virtuales/actions'

type SessionProps = {
  session: Session
}

const AllTasks = async ({ session }: SessionProps) => {
  const all_tasks = await getAllClasses(session.user.id)
  return (

    <div className='flex  justify-between'>
      <div className='flex flex-wrap space-x-1 space-y-1'>
        {
          all_tasks.map((task, index) => (
            <Card key={index} className='w-[300px] border border-card p-4'>
              <h3 className='font-roboto font-bold text-base mb-2 text-center'>Actividad {index + 1}</h3>
              <p className='text-xs'>Evaluacion generada por el tutor IA para la clase del dia {new Date(task.startTime).toLocaleDateString()}</p>
              <p className='text-xs'>Participantes: {task.maxParticipants}</p>
            </Card>
          ))
        }
      </div>
      <section className='w-max space-y-12'>
        <Image src={Robot} alt="Robot" width={400} height={400} />
        <article className='w-full space-y-4'>
          <h2 className='font-roboto font-bold text-4xl text-center'>Sabias que...?</h2>
          <div className='h-[250px] border border-card rounded-md p-4'>
            <p className='text-sm font-roboto font-bold'>I'm gonna = I'm going to</p>
          </div>
        </article>
      </section>
    </div>


  )
}

export default AllTasks

