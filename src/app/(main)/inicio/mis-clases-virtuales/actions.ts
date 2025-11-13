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
    const now = new Date();
    const gracePeriod = 5 * 60 * 1000; // 5 minutos
    const nowWithGrace = new Date(now.getTime() - gracePeriod);

    const response = await db.userActivity.findMany({
      where: {
        userId: id,
        class: {
          OR: [
            { startTime: { gt: now } }, // futuras
            {
              AND: [
                { startTime: { lte: now } }, // ya empezó
                { endTime: { gte: nowWithGrace } }, // tolerancia de 5 min
              ],
            },
          ],
        },
      },
      include: {
        class: true,
        task: true,
      },
      orderBy: {
        class: {
          startTime: "asc",
        },
      },
    });

    return response;
  } catch (error) {
    console.error("We could not retrieve upcoming classes for user id:", id, error);
  }
});


export const getPastClasses = cache(async (id: string) => {
  try {
    const now = new Date();

    const response = await db.userActivity.findMany({
      where: {
        userId: id,
        class: {
          endTime: {
            lt: now, // solo clases cuyo final ya pasó
          },
        },
      },
      include: {
        class: true,
        task: true,
      },
      orderBy: {
        class: {
          startTime: "desc", // de la más reciente a la más antigua
        },
      },
    });

    return response;
  } catch (error) {
    console.error("We could not retrieve past classes for user id:", id, error);
  }
});
