import { auth } from "@/auth";
import { db } from "@/db";
import { cache } from "react";

export const getTotalClass = cache(async () => {
  const session = await auth()

  try {
    const response = await db.user.findFirst({
      where: {
        id: session?.user.id
      },
      select: {
        totalClasses: true
      }
    })
    return response
  } catch (error) {
    console.error("We could not retrieve total classes for this user", error)
  }
})