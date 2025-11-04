import { CalendarEvent } from '@/lib/types'
import React from 'react'
import { Card } from '../ui/card'
import AccessCode from './AccessCode'
import JoinClass from './JoinClass'
import { auth } from '@/auth'
import AccessCodeClient from './AccessCodeClient'


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


  return (
    <Card key={index} className='flex w-full border border-card py-4 px-4 text-xs'>
      <p className='w-[80px] flex items-center justify-center'>{new Date(classItem.startTime).toLocaleDateString()}</p>
      <div className='flex space-x-1 w-[110px] items-center justify-center'>
        <p>{parsedStartTime}
        </p>
        <p>a</p>
        <p>{parsedEndTime}
        </p>
        <p>hs</p>
      </div>
      <p className='w-[80px] capitalize flex items-center justify-center'>{classItem.classType} {classItem.classType == 'grupal' && `(${classItem.currentParticipants}/${classItem.maxParticipants})`}</p>
      <p className='w-[65px] flex items-center capitalize justify-center'>{classItem.bookedById == session?.user?.id ? 'anfitrion' : 'invitado'}</p>
      <p className='w-[75px] flex items-center justify-center'>{estado}</p>
      <p className='w-[105px] flex items-center justify-center'>No Realizada</p>
      {classItem.bookedById == session?.user?.id ? (
        // <AccessCode code={classItem.accessCode} classType={classItem.classType} />
        <AccessCodeClient code={classItem.accessCode} classType={classItem.classType} />
      ) : <div className='w-[90px] justify-center'></div>}

      <JoinClass link={classItem.htmlLink} status={classItem.status} />
    </Card>
  )
}

export default EachClass