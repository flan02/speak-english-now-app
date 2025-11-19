"use server"

import { db } from "@/db";
import { CalendarEvent, PaymentMP } from "@/lib/types";
import { $Enums } from "@prisma/client";
import { google } from "googleapis";
import { NextResponse } from "next/server";


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


export async function listEvents() {
  try {
    const calendarId = process.env.CALENDAR_ID!;
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!),
      scopes: ['https://www.googleapis.com/auth/calendar']
    });

    const calendar = google.calendar({ version: 'v3', auth });


    const response = await calendar.events.list({
      calendarId: calendarId,
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
      timeMin: new Date().toISOString()
    });

    const events = response.data.items;

    if (!events || events.length === 0) {
      console.log("No hay eventos en el calendario.");
    } else {
      // Imprime los eventos completos en formato JSON
      console.log("Eventos completos:", JSON.stringify(events, null, 2));
    }
    console.log("Listing google calendar api events:", response);
    console.log("Listing google calendar api events:", response.data.items);
  } catch (error) {
    console.error("Error listing events:", error);
  }
}





export async function createGoogleCalendarEvent(calendarId: string, calendar: any, eventData: any) {
  const { startTime, endTime, isGroupClass, studentsCount } = eventData;

  const bookingClass = {
    summary: `Clase de Inglés`,
    description: `La clase sera ${isGroupClass ? 'grupal' : 'individual'} con x${studentsCount == 0 ? 1 : studentsCount} participantes`,
    start: {
      dateTime: startTime,
      timeZone: 'America/Argentina/Buenos_Aires',
    },
    end: {
      dateTime: endTime,
      timeZone: 'America/Argentina/Buenos_Aires',
    },
    conferenceData: {
      createRequest: {
        requestId: `meet-${Date.now()}`, // debe ser único
        conferenceSolutionKey: {
          type: 'hangoutsMeet', // ⚠️ este valor exacto
        },
      },
    },
    transparency: "opaque", // This line makes show the event as busy in our calendar
  }


  try {
    const response = await calendar.events.insert({
      calendarId,
      requestBody: bookingClass,
      conferenceDataVersion: 1, // Mandatory to obtain Google Meet link
    });

    return { response: response.data, success: true };

  } catch (error) {
    console.error("Error creating calendar event:", error);
    throw error;
  }
}

export async function createVirtualClass(body: any, userId: string) {
  try {
    const booking = await db.virtualClass.create({
      data: {
        bookedById: userId,
        startTime: new Date(body.start),
        endTime: new Date(body.end),
        classType: body.classType,
        classPrice: body.classPrice,
        maxParticipants: body.maxParticipants,
        preferenceId: body.preferenceId,
        learningFocus: body.learningFocus,
        participantsIds: [
          userId
        ]
      }
    });
    if (!booking) {
      throw new Error("Booking couldnt be created");
    }
  } catch (error) {
    console.error("We couldnt access to the database", error)
    return { success: false, status: 500 };
  }
  return { success: true, status: 200 };
}



export async function updateVirtualClass(googleCalendarEvent: any, body: any) {
  const { isGroupClass, studentsCount, text, preferenceId } = body;
  const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();  // Create a random access code with 8 char.

  console.log("updated Virtual class body received, after webhook successful", body)

  const saveCalendarEvent: Omit<CalendarEvent, 'bookedById' | 'participantsIds'> = {
    googleEventId: googleCalendarEvent.id,
    classType: isGroupClass ? 'grupal' : 'individual',
    accessCode: randomCode,
    startTime: new Date(googleCalendarEvent.start.dateTime),
    endTime: new Date(googleCalendarEvent.end.dateTime),
    maxParticipants: isGroupClass ? studentsCount : 1,
    currentParticipants: 1,
    classPrice: 111, // * Fix it later
    htmlLink: googleCalendarEvent.conferenceData.entryPoints[0].uri,
    status: "scheduled",
    summary: `${googleCalendarEvent.summary}. ${googleCalendarEvent.description}`,
    learningFocus: text,
    preferenceId: preferenceId,
    hostType: 'anfitrion',
  }

  // TODO: Already created in booking route. Must be filter by preferenceId and updated
  try {
    // Find the record first because `preferenceId` is not a unique field in Prisma's schema,
    // and `update` requires a unique identifier in the `where` clause.
    const reservedClassFound = await db.virtualClass.findFirst({
      where: { preferenceId },
      select: { id: true }
    });

    if (!reservedClassFound) {
      return NextResponse.json({ error: 'Virtual class not found' }, { status: 404 });
    }

    const newClass = await db.virtualClass.update({
      where: {
        id: reservedClassFound.id
      },
      data: saveCalendarEvent
    })

    if (newClass) {
      await db.userActivity.create({
        data: {
          userId: newClass.bookedById,
          classId: newClass.id,
          taskId: null,
          rol: 'anfitrion',
          completed: null,
        }
      })
    }

    return NextResponse.json({ success: true, status: 200 });

  } catch (error) {
    console.error('Error saving google event in database', error)
    return NextResponse.json({ error: 'Failed to save google event in database' }, { status: 500 });
  }
}



export async function getGoogleMeetLink(accessCode: string) {
  try {
    const googleMeetLink = await db.virtualClass.findFirst({
      where: {
        accessCode
      },
      select: {
        id: true,
        bookedById: true,
        htmlLink: true,
        startTime: true,
        endTime: true,
        classType: true,
        currentParticipants: true,
        maxParticipants: true
      }
    })

    if (!googleMeetLink) {
      console.log(`We couldn't match any meeting for this code: ${accessCode} `);
      return null
    }
    return googleMeetLink;

  } catch (error) {
    console.error("We couldn't retrieve our google meet link", error)
  }
}


export async function addParticipant(event: any, userId: string) {
  try {
    const result = await db.$transaction(async (tx) => {
      const existing = await tx.virtualClass.findUnique({
        where: { id: event.id },
        select: {
          bookedById: true,
          participantsIds: true,
          currentParticipants: true,
          maxParticipants: true
        }
      });

      if (!existing) throw new Error("Clase no encontrada");

      if (existing.participantsIds.includes(userId)) {
        return { message: "El usuario ya está registrado en la clase" };
      }

      if (existing.currentParticipants >= existing.maxParticipants) {
        return { message: "La clase ya alcanzó el número máximo de participantes" };
      }

      // ? Create a registry in UserActivity
      await tx.userActivity.create({
        data: {
          userId,
          classId: event.id,
          taskId: null,
          rol: 'participante',
          completed: false,
        },
      })

      const response = await tx.virtualClass.update({
        where: {
          id: event.id
        },
        data: {
          currentParticipants: {
            increment: 1
          },
          participantsIds: {
            push: userId
          },
        },
      });
      return response;
    });

    return result;
  } catch (error) {
    console.error("We couldn't add a new participant in this meeting", error);
    return { error: "No se pudo agregar el participante", details: error };
  }
}

export async function getUpcomingClasses() {

  try {
    const response = await db.virtualClass.findMany({
      where: {
        startTime: {
          gte: new Date(),
        },
      },
      orderBy: {
        startTime: "asc",
      },
      select: {
        id: true,
        maxParticipants: true,
        classType: true,
        status: true,
        startTime: true,
        endTime: true
      }
    });
    return response
  } catch (error) {
    console.error("Our db couldn't retrieve upcoming classes", error)
  }
}


export async function createPayment(data: PaymentMP) {
  try {
    const response = await db.paymentMercadoPago.create({
      data: {
        userId: data.userId,
        preferenceId: data.preferenceId,
        price: data.amount,
        type: data.type,
        maxParticipants: data.maxParticipants,
        status: data.status
      }
    })

    return { response, success: true };
  } catch (error) {
    console.error("Error creating payment record in our database:", error);
  }
}

export async function updatePayment(preferenceId: string) {
  try {
    const response = await db.paymentMercadoPago.update({
      where: {
        preferenceId
      },
      data: {
        status: 'approved'
      }
    })
    return { response, success: true };
  } catch (error) {
    console.error("Error updating and approving payment record in our database:", error);
  }
}


export async function findVirtualClass(preferenceId: string) {
  try {
    const response = await db.virtualClass.findFirst({
      where: {
        preferenceId
      },
      select: {
        startTime: true,
        endTime: true,
        classType: true,
        maxParticipants: true
      }
    });
    return { response, success: true };
  } catch (error) {
    console.error("Error finding virtual class in our database:", error);
  }
}
/* 
* EXAMPLE EVENT CREATED
{
  kind: 'calendar#event',
  etag: '"3520948709485150"',
  id: '76rgnvdee81tr12trkvd161i1k',
  status: 'confirmed',
  htmlLink: 'https://www.google.com/calendar/event?eid=NzZyZ252ZGVlODF0cjEydHJrdmQxNjFpMWsgY2hhbml2ZXRkYW4xOTg4QG0',
  created: '2025-10-14T20:39:14.000Z',
  updated: '2025-10-14T20:39:14.742Z',
  summary: 'Clase de Inglés reservada por (Dan Chanivet)',
  description: 'La clase sera individual con x1 participantes',
  creator: { email: 'hablainglesya@cvai-448217.iam.gserviceaccount.com' },
  organizer: { email: 'chanivetdan1988@gmail.com', self: true },
  start: {
    dateTime: '2025-10-18T20:00:00-03:00',
    timeZone: 'America/Argentina/Buenos_Aires'
  },
  end: {
    dateTime: '2025-10-18T21:00:00-03:00',
    timeZone: 'America/Argentina/Buenos_Aires'
  },
  iCalUID: '76rgnvdee81tr12trkvd161i1k@google.com',
  sequence: 0,
  reminders: { useDefault: true },
  eventType: 'default'
}

*/