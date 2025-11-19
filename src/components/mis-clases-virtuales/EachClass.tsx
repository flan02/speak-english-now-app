import { CalendarEvent } from '@/lib/types'
import React from 'react'
import { Card } from '../ui/card'
import JoinClass from './JoinClass'
import { auth } from '@/auth'
import AccessCodeClient from './AccessCodeClient'
import { validateMeetingDate } from '@/lib/utils'


type Props = {
  index: number
  classItem: CalendarEvent
}

const EachClass = async ({ classItem, index }: Props) => {
  const session = await auth()
  const estado = classItem.status === 'scheduled' ? 'Reservada' : classItem.status === 'completed' ? 'Completada' : 'Cancelada'
  const parsedStartTime = classItem.startTime.toLocaleString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // ✅ esto fuerza formato 24hs
  })
  const parsedEndTime = classItem.endTime.toLocaleString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // ✅ esto fuerza formato 24hs
  })

  // * Validate if the meeting can be joined (60 minutes before start time)
  const isValidMeeting = validateMeetingDate(classItem.startTime.toLocaleDateString("es-AR"), parsedStartTime, parsedEndTime) // validate in line 61 alongside classItem.bookedById == session?.user?.id 


  console.log(classItem.accessCode);
  return (
    <Card key={index} className='flex flex-col items-start text-sm xl:text-xs 2xl:text-xs xl:flex-row 2xl:flex-row xl:items-center 2xl:items-center py-4 px-4 border border-card space-y-2 lg:space-y-0 xl:space-y-0 2xl:space-y-0'>
      <p className='font-bold xl:font-normal 2xl:font-normal xl:w-[75px] 2xl:w-[75px] flex items-center justify-center'>
        <span className='block lg:hidden w-[80px] xl:w-auto 2xl:w-auto'>Dia: </span>
        {new Date(classItem.startTime).toLocaleDateString("es-AR")}
      </p>
      <div className='flex space-x-1 w-full xl:w-[110px] 2xl:w-[110px] items-center justify-start xl:justify-center'>
        <p className='font-bold xl:font-normal 2xl:font-normal xl:w-[90px] 2xl:w-[90px] flex items-center justify-center'>
          <span className='block lg:hidden w-[80px] xl:w-auto 2xl:w-auto'>Hora: </span>
          {parsedStartTime} a {parsedEndTime} hs
        </p>
      </div>
      <p className='font-bold xl:font-normal 2xl:font-normal xl:w-[80px] 2xl:w-[80px] flex items-center justify-center capitalize'>
        <span className='block lg:hidden w-[80px] xl:w-auto 2xl:w-auto'>Tipo: </span>
        {classItem.classType} {classItem.classType == 'grupal' && `(${classItem.currentParticipants}/${classItem.maxParticipants})`}
      </p>
      <p className='font-bold xl:font-normal 2xl:font-normal xl:w-[70px] 2xl:w-[70px] flex items-center justify-center capitalize'>
        <span className='block lg:hidden w-[80px] xl:w-auto 2xl:w-auto'>Rol: </span>
        {classItem.bookedById == session?.user?.id ? 'anfitrion' : 'invitado'}
      </p>
      <p className='font-bold xl:font-normal 2xl:font-normal xl:w-[75px] 2xl:w-[75px] flex items-center justify-center capitalize'>
        <span className='block lg:hidden w-[80px] xl:w-auto 2xl:w-auto'>Estado: </span>
        {estado}
      </p>
      <p className='font-bold xl:font-normal 2xl:font-normal xl:w-[100px] 2xl:w-[100px] flex items-center justify-center capitalize'>
        <span className='block lg:hidden w-[80px] xl:w-auto 2xl:w-auto'>Tarea IA: </span>
        No Realizada
      </p>
      {classItem.bookedById == session?.user?.id ? (
        <div className='font-bold xl:font-normal 2xl:font-normal xl:w-[90px] 2xl:w-[90px] flex items-center justify-center capitalize'>
          <span className='block lg:hidden w-[80px] xl:w-auto 2xl:w-auto'>Codigo: </span>
          <AccessCodeClient code={classItem.accessCode} classType={classItem.classType} />
        </div>
      ) : <div className='w-[90px] justify-center'></div>}
      <JoinClass
        link={classItem.htmlLink!}
        status={classItem.status}
        date={classItem.startTime.toLocaleDateString("es-AR")}
        time={{ start: parsedStartTime, end: parsedEndTime }}
      />
    </Card>
  )
}

export default EachClass