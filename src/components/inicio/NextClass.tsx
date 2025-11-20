"use server"

import { getNextClass } from "@/app/(main)/inicio/actions"
import { calcularTiempoRestante, customDate, toArgentinaTZ } from "@/lib/utils"
import { parse } from "path"

type Props = {}

export async function NextClass(props: Props) {
  const nextClass = await getNextClass()

  const argStart = toArgentinaTZ(new Date(nextClass?.startTime!));

  // const parsedStartTime = argStart.toLocaleTimeString("es-AR", {
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   hour12: false
  // });


  return (
    <article className='flex justify-between mb-2 lg:mb-0 xl:mb-0'>
      {
        nextClass && new Date(nextClass.endTime) > new Date() ?
          <div className='bg-highlight w-full mx-1 rounded-lg xl:w-full 2xl:w-full flex justify-around items-start flex-col px-2 xl:items-center 2xl:items-center xl:flex-row 2xl:flex-row space-x-2 xl:px-2 xl:text-xs 2xl:px-4 2xl:text-sm font-roboto xl:mx-4 2xl:mx-4 py-6 xl:py-0 2xl:py-0'>
            <div className='flex items-center space-x-2 text-sm'>
              <h2 className='py-2 underline underline-offset-2 font-bold xl:font-normal 2xl:font-normal'>Siguiente clase:</h2>
              <p className='pr-4'>{customDate(argStart)}</p>
            </div>
            <div className='flex items-center space-x-2 text-sm'>
              <h2 className='py-2 underline underline-offset-2 font-bold xl:font-normal 2xl:font-normal'>Participantes confirmados:</h2>
              <p className=''>{nextClass.currentParticipants} de</p>
              <p className='-ml-0.5'>{nextClass.maxParticipants}</p>
            </div>
            <div className='flex items-center space-x-2 text-sm'>
              <h2 className='py-2 underline underline-offset-2 font-bold xl:font-normal 2xl:font-normal'>Comienza en:</h2>
              <p className='font-roboto'>{calcularTiempoRestante(nextClass.startTime)}</p>
            </div>
          </div>
          :
          <p className='px-2 xl:px-6 2xl:px-6 py-2 font-bold font-roboto text-sm xl:mx-4 2xl:mx-4 border border-card w-full rounded-lg'>
            <span className='underline'>Siguiente clase</span>: &nbsp;No tenes clases programadas
          </p>
      }

    </article>
  )
}

export default NextClass