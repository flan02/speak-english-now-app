"use server"
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

export const getNextClass = cache(async () => {
  const session = await auth()

  try {
    const today = new Date();
    const response = await db.virtualClass.findFirst({
      where: {
        bookedById: session?.user.id,
        startTime: {
          gte: today
        }
      },
      orderBy: {
        // createdAt: 'desc'
        startTime: 'asc'
      }
    })
    return response
  } catch (error) {
    console.error("We could not retrieve last class for this user", error)
  }
})


export async function subscribeUser(prevState: { message: string }, formData: FormData) {
  try {
    const email = formData.get("email") as string
    //console.log("Received email", email);

    if (!email) {
      return { message: "El email es obligatorio" }
    }

    const user = await db.user.findUnique({ where: { email } })

    if (!user) {
      return { message: "El email no está registrado." }
    }

    // 2️⃣ Verificar si ya está suscripto
    if (user.newsletter === "si") {
      return { message: "Ya estabas suscripto al newsletter." }
    }

    const response = await db.user.update({
      where: { email },
      data: {
        newsletter: 'si'
      }
    })

    if (!response) {
      return { message: "No se pudo suscribir al newsletter. Intenta nuevamente más tarde." }
    }

    return { message: "Te suscribiste correctamente al newsletter" }

  } catch (error) {
    console.error("Error al suscribir usuario:", error)
    return { message: 'Ocurrio un error inesperado. Intenta nuevamente más tarde' }
  }
}

export async function supportUser(prevState: { message: string }, formData: FormData) {
  try {
    const contacto = formData.get("contacto") as string
    const message = formData.get("textarea") as string

    if (!contacto || !message) {
      return { message: "Todos los campos son obligatorios." }
    }

    const response = await db.visitorInquiry.create({
      data: {
        medioContacto: contacto,
        mensaje: message
      }
    })

    if (!response) {
      return { message: "No se pudo enviar tu consulta. Intenta nuevamente más tarde." }
    }

    return { message: "Tu consulta ha sido enviada. Te responderemos a la brevedad." }
  } catch (error) {
    console.error("Error al enviar consulta de soporte:", error)
    return { message: 'Ocurrio un error inesperado. Intenta nuevamente más tarde' }
  }

}