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

  const classId = formData.get('classId') as string
  const data: ActividadModel = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    solvedContent: formData.get('solvedContent') as string,
    description: formData.get('description') as string,
    type: formData.get('type') as "exam" | "audio" | "video" | "reading",
    difficulty: formData.get('difficulty') as "easy" | "medium" | "hard",
  }
  try {



    // ? Nueva tarea
    const newTask = await db.task.create({ data })
    if (newTask) {
      console.log('Activity created successfully', newTask)
    }



    //  ? Clase a las que se asigna la tarea
    const classFound = await db.virtualClass.findUnique({
      where: {
        id: classId
      },
      select: {
        id: true,
        participantsIds: true,
      }
    });

    if (!classFound) {
      throw new Error("Clase no encontrada");
    }

    await db.userActivity.updateMany({
      where: {
        classId: classFound.id
      },
      data: {
        taskId: newTask.id,
        completed: false
      }
    })
    // // ! UPDATE Crear UserActivity para cada participante
    // const userActivities = classFound?.participantsIds.map(userId => ({
    //   userId,
    //   taskId: newTask.id,
    //   classId: classFound.id,
    //   rol: (userId === classFound.bookedById ? 'anfitrion' : 'participante') as 'anfitrion' | 'participante',
    //   completed: false,
    // }));

    // if (userActivities) {

    //   await db.userActivity.createMany({ data: userActivities });
    // }

    // ? Marcar en la clase que ya se asignó la actividad
    await db.virtualClass.update({
      where: { id: classFound?.id },
      data: {
        activityStatus: 'uploaded' as 'uploaded' | 'pending',
      }
    });


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

/* 
Cómo se usa después UserActivity

Consultas por usuario:

const actividadesUsuario = await prisma.userActivity.findMany({
  where: { userId },
  include: { task: true, class: true }
});


Consultas por clase:

const actividadesClase = await prisma.userActivity.findMany({
  where: { classId },
  include: { user: true, task: true }
});


Actualización de progreso:

await prisma.userActivity.update({
  where: { id: userActivityId },
  data: { completed: true, score: 95 }
});
*/