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
      },
    })
    return response
  } catch (error) {
    console.log(error);
    return error
  }
}


export async function updateUserData({ id, localidad, nivel, telefono }: { id: string, localidad: string, nivel: $Enums.NivelIngles, telefono: number }) {
  try {
    const response = await db.user.update({
      where: { id },
      data: {
        localidad,
        nivel,
        telefono,
      }
    })
    return response
  } catch (error) {
    console.log(error);
    return error
  }
}