'use client'
import Image from 'next/image'
import React from 'react'
import { Card } from '../ui/card'
import Robot from '../../../public/robot.png'
import { getAllClasses } from '@/app/(main)/inicio/mis-clases-virtuales/actions'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import P from '../reutilizable/P'


type SessionProps = {
  all_tasks: Awaited<ReturnType<typeof getAllClasses>>
}

const AllTasks = ({ all_tasks }: SessionProps) => {

  return (

    <div className='flex w-full min-w-[350px] justify-between'>
      <section className='flex flex-wrap space-x-1 space-y-1 h-[1020px]'>
        {
          all_tasks?.filter(item => item.taskId !== null)
            .map((item, index) => (
              <Link href={`/actividad/${item.taskId}`} key={index} className='no-underline'>
                <Card key={index} className='w-[300px] border border-task p-4 h-[500px] space-y-1 overflow-y-hidden'>
                  <h3 className='font-bold text-center'>{item.task?.title}</h3>
                  <div className='flex justify-between mt-2 mb-4'>
                    <p className='text-xs'>Fecha: {item.class?.startTime.toLocaleDateString()}</p>
                    <p className='text-xs'>Participantes: {item.class?.participantsIds.length}</p>
                  </div>

                  <div className='text-[8px] h-[410px] font-roboto overflow-y-hidden fade-out'>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {item.task?.content || ''}
                    </ReactMarkdown>
                  </div>

                </Card>
              </Link>
            ))
        }
      </section>
      <section className='space-y-12'>
        <Image src={Robot} alt="Robot" width={300} height={300} className='mx-auto' />
        <article className='border border-card font-roboto rounded-md py-2 space-y-2'>
          <h2 className='font-roboto font-bold text-3xl text-center mb-4'>Sabias que...?</h2>
          <P />
        </article>
      </section>
    </div>


  )
}

export default AllTasks

