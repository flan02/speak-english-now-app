"use server"

import { db } from "@/db"
import { cache } from "react";


export const getAllClasses = cache(async (id: string) => {

  const response = await db.virtualClass.findMany({
    where: {
      OR: [
        { bookedById: id },
        {
          participantsIds: {
            has: id
          }
        }]
    },
    orderBy: {
      startTime: 'desc'
    }
  })
  // const response = await db.virtualClass.findMany({
  //   where: {
  //     bookedById: id
  //   },
  // })

  // const guestResponse = await db.virtualClass.findMany({
  //   where: {
  //     participantsIds: {
  //       has: id
  //     }
  //   }
  // })



  // const mergedResponse = [...response, ...guestResponse];
  // mergedResponse.sort((a, b) => b.startTime.getTime() - a.startTime.getTime()); // Ordenar por startTime descendente
  response.sort((a, b) => b.startTime.getTime() - a.startTime.getTime()); // Ordenar por startTime descendente

  return response // NextResponse, NextRequest only are used route APIs
})
