import React from 'react'
import { Card } from '../ui/card'
import { auth } from '@/auth'
import AccessCode from '../mis-clases-virtuales/AccessCode'
import JoinClass from '../mis-clases-virtuales/JoinClass'
import { VirtualClass } from '@/lib/types'
import { Button } from '../ui/button'
import Link from 'next/link'

type Props = {
  classItem: VirtualClass
  index: number

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
      <p className='w-[65px] flex items-center capitalize justify-center'>
        Admin
      </p>

      <p className='w-[90px] flex items-center justify-center'>{estado}</p>


      <AccessCode code={classItem.accessCode} classType={classItem.classType} />


      <JoinClass link={classItem.htmlLink} status={classItem.status} />
      <p className='w-[105px] flex items-center justify-center'>
        {classItem.actividad === 'pending'
          ? <Button asChild size="sm" className='bg-green-600 hover:bg-green-600/80 text-white text-xs w-[80px]'>
            <Link href={`/admin/actividad/${classItem.id}`}>Pendiente</Link>
          </Button>
          : <Button disabled size="sm" className='bg-black text-white text-xs w-[80px]'>Enviada</Button>
        }
      </p>
    </Card>
  )
}

export default EachClass