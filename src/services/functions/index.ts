"use server"

import { db } from "@/db";
import { $Enums } from "@prisma/client";

export async function getUserData({ id }: { id: string }) {
  try {
    const response = await db.user.findUnique({
      where: { id },
      select: {
        localidad: true,
        nivel: true,
        telefono: true,
        newsletter: true
      }
    })
    return response
  } catch (error) {
    console.log(error);
    return error
  }
}


export async function updateUserData({ id, localidad, nivel, telefono, newsletter }: { id: string, localidad: string, nivel: $Enums.NivelIngles, telefono: number, newsletter: 'si' | 'no' }) {
  try {
    const response = await db.user.update({
      where: { id },
      data: {
        localidad,
        nivel,
        telefono,
        newsletter
      }
    })
    return response
  } catch (error) {
    console.log(error);
    return error
  }
}