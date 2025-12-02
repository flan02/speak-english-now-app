"use server"
import { auth } from "@/auth";
import { db } from "@/db";
import { generateTicketId } from "@/lib/utils";
import { URL_ROUTES } from "@/services/api/routes";
import { TicketSchema } from "@/zod";
import { revalidatePath } from "next/cache";


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

    revalidatePath(URL_ROUTES.TICKETS); // O donde muestres los tickets
    return { message: ticketNumber };
  } catch (error) {
    console.error("Error al enviar consulta de soporte:", error)
    return { message: 'Ocurrio un error inesperado. Intenta nuevamente más tarde' }
  }

}


export async function getTickets() {
  const session = await auth();

  if (!session?.user.id) {
    return [];
  }

  try {
    const tickets = await db.supportTicket.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        ticketNumber: true,
        status: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return tickets;
  } catch (error) {
    console.error('Error al obtener los tickets:', error);
    return [];
  }
}

export async function getTicketChat(ticketNumber: string) {
  const session = await auth();
  if (!session?.user.id) {
    return null;
  }

  try {
    const ticket = await db.supportTicket.findFirst({
      where: {
        ticketNumber: ticketNumber,
        userId: session.user.id, // Asegurarse que el ticket pertenece al usuario
      },
      select: {
        messages: true,
        ticketNumber: true,
        status: true,
      }
    });
    return ticket;
  } catch (error) {
    console.error('Error al obtener el chat del ticket:', error);
    return null;
  }
}

export async function addMessageToTicket(formData: FormData) {
  const session = await auth();
  const messageContent = formData.get('message') as string;
  const ticketNumber = formData.get('ticketNumber') as string;

  if (!session?.user.id || !messageContent || !ticketNumber) {
    // Manejar error, quizás devolver un objeto de error
    return;
  }

  try {
    // Primero, obtenemos el ticket para asegurarnos de que existe y pertenece al usuario
    const ticket = await db.supportTicket.findFirst({
      where: {
        ticketNumber: ticketNumber,
        userId: session.user.id,
      }
    });

    if (!ticket) {
      throw new Error("Ticket no encontrado o no autorizado.");
    }

    // Creamos el nuevo mensaje
    const newMessage = {
      role: "USER",
      content: messageContent,
      createdAt: new Date(),
    };

    // Actualizamos el ticket añadiendo el nuevo mensaje al array
    await db.supportTicket.update({
      where: {
        id: ticket.id,
      },
      data: {
        messages: {
          push: newMessage as any,
        },
      },
    });

    // Revalidamos la ruta para que el UI se actualice
    revalidatePath(`${URL_ROUTES.TICKETS}?ticketId=${ticketNumber}`);

  } catch (error) {
    console.error("Error al añadir mensaje al ticket:", error);
    // Manejar el error apropiadamente
  }
}