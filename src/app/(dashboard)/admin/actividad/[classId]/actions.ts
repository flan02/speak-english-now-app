import { db } from "@/db"

export async function getVirtualClass(classId: string) {

  try {
    const virtualClass = await db.virtualClass.findUnique({
      where: {
        id: classId
      }
    })
    return virtualClass
  } catch (error) {
    console.error('We can not retrieve data from this class', error)
    // return { message: 'We can not retrieve data from this class', status: 500 }
  }
}