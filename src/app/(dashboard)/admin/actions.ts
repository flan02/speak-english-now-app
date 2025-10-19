"use server"
import { cache } from "react";
import { db } from "@/db"

// * CALLS DB ONLY ONCE AND CACHE THE RESULT. DOESN'T MATTER IF USEPARAMS CHANGES, WORKS ON CACHED DATA.
export const getAllClasses = cache(async () => {
  try {
    const response = db.virtualClass.findMany({
      orderBy: {
        startTime: 'desc'
      }
    })


    return response

  } catch (error) {
    console.error('We could not retrieve the classes at this time', error)
  }
})

// * CALLS DB EACH TIME THAT USEPARAMS CHANGES. (EACH TIME FILTER CHANGES, CALLS DB AGAIN).
// export const getAllClasses = cache(async (filter?: string) => {
//   return db.virtualClass.findMany({
//     where: filter ? { status: filter } : undefined,
//     orderBy: { createdAt: "desc" },
//   });
// });
