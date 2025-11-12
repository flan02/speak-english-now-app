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


export const getUpcomingClasses = cache(async (id: string) => {
  try {
    const response = await db.userActivity.findMany({
      where: {
        userId: id,
        class: {
          startTime: {
            gt: new Date() // solo clases con fecha/hora mayor a ahora
          }
        }
      },
      include: {
        class: true,
        task: true
      },
      orderBy: {
        class: {
          startTime: 'asc' // de la más próxima a la más lejana
        }
      }
    });

    return response;
  } catch (error) {
    console.error("We could not retrieve upcoming classes for user id:", id, error);
  }
});

export const getPastClasses = cache(async (id: string) => {
  try {
    const response = await db.userActivity.findMany({
      where: {
        userId: id,
        class: {
          startTime: {
            lt: new Date() // lt = menor que → clases que ya ocurrieron
          }
        }
      },
      include: {
        class: true,
        task: true
      },
      orderBy: {
        class: {
          startTime: 'desc' // de la más reciente a la más antigua
        }
      }
    });

    return response;
  } catch (error) {
    console.error("We could not retrieve past classes for user id:", id, error);
  }
});
