"use server"
import { auth } from "@/auth"
import { db } from "@/db"

export async function getTask(taskId: string) {
  try {
    const task = await db.task.findUnique({
      where: {
        id: taskId
      }
    })

    return task
  } catch (error) {
    console.error('We could not retrieve any task', error)
  }
}


export async function completeTask(taskId: string) {
  try {
    const session = await auth()
    let userId = session?.user.id;

    const userActivity = await db.userActivity.findFirst({
      where: {
        taskId: taskId,
        userId: userId
      }, select: {
        id: true
      }
    })

    if (!userActivity) {
      throw new Error('User activity not found for the given task and user');
    }
    const updatedTask = await db.userActivity.update({
      where: {
        id: userActivity.id
      },
      data: {
        completed: true
      }
    })
    if (!updatedTask) {
      throw new Error('Task not found or could not be updated');
    }
    return updatedTask
  } catch (error) {
    console.error('We could not update this task', error)
  }

}


export async function getResponse(formData: FormData) {
  try {

    const taskId = formData.get('taskId') as string;

    const isComplete = await db.task.findFirst({
      where: {
        id: taskId,
      },
      select: {
        solvedContent: true
      }
    })
  } catch (error) {
    console.error('We could not retrieve the responses for this task', error)
  }
}


export async function completedClass() {
  const session = await auth()
  const userId = session?.user.id;
  try {
    await db.user.update({
      where: { id: userId },
      data: {
        totalClasses: {
          increment: 1
        }
      }
    })
  } catch (error) {
    console.error('We could not complete the class', error)
  }
}


export const markTaskComplete = async (actividadId: string) => {
  const userActivity = await getUserActivity(actividadId)
  if (!userActivity?.completed) {
    await completeTask(actividadId)
    await completedClass()
  }
}


export async function getUserActivity(taskId: string) {
  try {
    const response = await db.userActivity.findFirst({
      where: {
        taskId: taskId
      },
      select: {
        id: true,
        completed: true
      }
    })
    return response
  } catch (error) {
    console.error(error)
  }
}