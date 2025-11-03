"use server"

import { db } from "@/db"
import { cache } from "react";


export const getAllClasses = cache(async (id: string) => {

  try {
    const response = await db.userActivity.findMany({
      where: {
        userId: id
      },
      include: {
        class: true,
        task: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const sorted = response.sort((a, b) => {
      const aDate = a.class?.startTime ? new Date(a.class.startTime).getTime() : 0;
      const bDate = b.class?.startTime ? new Date(b.class.startTime).getTime() : 0;
      return bDate - aDate;
    })

    return sorted;

  } catch (error) {
    console.error("We could not retrieve activities for this user id", id)
  }
})
