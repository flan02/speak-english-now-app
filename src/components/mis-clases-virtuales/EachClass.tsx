import { CalendarEvent } from '@/lib/types'
import React from 'react'
import { Card } from '../ui/card'
import AccessCode from './AccessCode'
import JoinClass from './JoinClass'
import { auth } from '@/auth'


type Props = {
  index: number
  classItem: CalendarEvent
}



const EachClass = async ({ classItem, index }: Props) => {

  const session = await auth()

  const estado = classItem.status === 'scheduled' ? 'Reservada' : classItem.status === 'completed' ? 'Completada' : 'Cancelada'
  return (
    <Card key={index} className='flex w-full border border-card py-4 px-4 text-xs'>
      <p className='w-[80px] flex items-center'>{new Date(classItem.startTime).toLocaleDateString()}</p>
      <div className='flex space-x-1 w-[120px] items-center'>
        <p>{classItem.startTime.toLocaleString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, // ✅ esto fuerza formato 24hs
        })}
        </p>
        <p>a</p>
        <p>{classItem.endTime.toLocaleString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, // ✅ esto fuerza formato 24hs
        })}
        </p>
        <p>hs</p>
      </div>
      <p className='w-[80px] capitalize flex items-center'>{classItem.classType} {classItem.classType == 'grupal' && `(${classItem.maxParticipants})`}</p>
      {/* <p className='w-[70px] flex items-center capitalize'>{classItem.participantsIds.length == 0
        ? classItem.hostType
        : classItem.participantsIds.map((id) => id == session?.user?.id!
          ? 'Invitado'
          : classItem.hostType)
      }</p> */}
      <p className='w-[70px] flex items-center capitalize'>
        {classItem.participantsIds.includes(session?.user?.id!)
          ? 'Invitado'
          : classItem.hostType}
      </p>

      <p className='w-[80px] flex items-center'>{estado}</p>
      <p className='w-[90px] flex items-center'>No Realizada</p>
      {/* {
        classItem.participantsIds.length == 0
          ? <AccessCode code={classItem.accessCode} classType={classItem.classType} />
          : classItem.participantsIds.map((id) => id == session?.user?.id!
            ? <div className='w-[90px]'></div>
            : <AccessCode code={classItem.accessCode} classType={classItem.classType} />)
      } */}
      {!classItem.participantsIds.includes(session?.user?.id!) ? (
        <AccessCode code={classItem.accessCode} classType={classItem.classType} />
      ) : <div className='w-[90px]'></div>}

      <JoinClass link={classItem.htmlLink} />
    </Card>
  )
}

export default EachClass