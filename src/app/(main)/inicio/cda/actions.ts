"use server"
import { auth } from "@/auth";
import { db } from "@/db";
import { generateTicketId } from "@/lib/utils";
import { TicketSchema } from "@/zod";


export async function generateTicket(prevState: { message: string }, formData: FormData) {
  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    return { message: "No estás autorizado. Inicia sesión." };
  }

  try {
    const message = formData.get("textarea") as string
    const honey = formData.get("website_url") as string

    // Honeypot check
    if (honey) {
      console.log("👮 Bot atrapado en honeypot")
      return { message: "Tu consulta ha sido enviada. Te responderemos a la brevedad." }
    }

    const validatedFields = TicketSchema.safeParse({
      message: message,
    });

    if (!validatedFields.success) {
      return {
        message: validatedFields.error.errors.map((err) => err.message).join(', '),
      };
    }

    const ticketNumber = generateTicketId();
    const response = await db.supportTicket.create({
      data: {
        userId: session?.user.id!,
        ticketNumber,
        description: message,
        category: ("GENERAL" as any),
        messages: [
          {
            role: "USER",
            content: message,
            createdAt: new Date(),
          },
        ],

      }
    })

    if (!response) {
      return { message: "No se pudo enviar tu consulta. Intenta nuevamente más tarde." }
    }

    //revalidatePath("/dashboard"); // O donde muestres los tickets
    return { message: ticketNumber };
  } catch (error) {
    console.error("Error al enviar consulta de soporte:", error)
    return { message: 'Ocurrio un error inesperado. Intenta nuevamente más tarde' }
  }

}