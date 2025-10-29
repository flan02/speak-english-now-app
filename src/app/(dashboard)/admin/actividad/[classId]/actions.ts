"use server"
import { db } from "@/db"
import { ActividadModel } from "@/lib/types"

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


export async function uploadExam(formData: FormData) {

  const data: ActividadModel = {
    classIds: [formData.get('classIds') as string],
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    solvedContent: formData.get('solvedContent') as string,
    description: formData.get('description') as string,
    type: formData.get('type') as "exam" | "audio" | "video" | "reading",
    difficulty: formData.get('difficulty') as "easy" | "medium" | "hard",
  }
  try {

    const newTask = await db.task.create({ data })
    if (newTask) {
      console.log('Activity created successfully', newTask)
    }

    /* 
    // Nueva tarea
const newTask = await prisma.task.create({
  data: { title, content, type, difficulty }
});

// Clase a las que se asigna la tarea
const clase = await prisma.virtualClass.findUnique({ 
  where: { id: classId } 
});

// Crear UserActivity para cada participante
const userActivities = clase.participantsIds.map(userId => ({
  userId,
  taskId: newTask.id,
  classId: clase.id,
}));

await prisma.userActivity.createMany({ data: userActivities });

// Marcar en la clase que ya se asignó la actividad
await prisma.virtualClass.update({
  where: { id: clase.id },
  data: { actividad: 'sent' }
});

    */


  } catch (error) {
    console.error('We could not create this activity', error)

  }

}

/*
Indexación para consultas rápidas

Considera crear índices en MongoDB (con Prisma se hace vía @@index) para campos que vas a consultar mucho, por ejemplo:

model UserActivity {
 @@index([userId])
 @@index([taskId])
 @@index([classId])
}

*/