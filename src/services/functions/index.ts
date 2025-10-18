"use server"

import { db } from "@/db";
import { CalendarEvent } from "@/lib/types";
import { $Enums, Status } from "@prisma/client";
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





export async function createGoogleCalendarEvent(calendarId: string, calendar: any, eventData: any, userData: any) {

  const { start, end, isGroupClass, studentsCount } = eventData;

  const bookingClass = {
    summary: `Clase de Inglés reservada por (${userData?.name})`,
    description: `La clase sera ${isGroupClass ? 'grupal' : 'individual'} con x${studentsCount == 0 ? 1 : studentsCount / 10000} participantes`,
    start: {
      dateTime: start,
      timeZone: 'America/Argentina/Buenos_Aires',
    },
    end: {
      dateTime: end,
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

    return response.data;

  } catch (error) {
    console.error("Error creating calendar event:", error);
    throw error;
  }
}


export async function saveGoogleCalendarEvent(googleCalendarEvent: any, userId: string, body: any) {
  const { isGroupClass, studentsCount, text } = body;
  const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();  // Create a random access code with 8 char.

  console.log("current studentsCount", studentsCount);

  const price = studentsCount > 2 ? (studentsCount) : (12000 * (studentsCount + 1));

  const saveCalendarEvent: CalendarEvent = {
    googleEventId: googleCalendarEvent.id,
    bookedById: userId,
    classType: isGroupClass ? 'grupal' : 'individual',
    accessCode: randomCode,
    startTime: new Date(googleCalendarEvent.start.dateTime),
    endTime: new Date(googleCalendarEvent.end.dateTime),
    maxParticipants: studentsCount == 0 ? 1 : studentsCount / 10000,
    currentParticipants: 1,
    classPrice: price,
    htmlLink: googleCalendarEvent.conferenceData.entryPoints[0].uri,
    status: "scheduled",
    summary: googleCalendarEvent.summary,
    description: googleCalendarEvent.description,
    learningFocus: text,
    hostType: 'anfitrion',
    participantsIds: []
  }

  try {

    console.log('google calendar event arriving to save fc', googleCalendarEvent);

    const response = await db.virtualClass.create({
      data: saveCalendarEvent
    })

    return NextResponse.json({
      success: true,
      message: 'Google Calendar event saved successfully',
      data: response,
      status: 200
    });

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



      const response = await tx.virtualClass.update({
        where: { id: event.id },
        data: {
          currentParticipants: { increment: 1 },
          participantsIds: { push: userId },
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


/* 
TODO: EXAMPLE EVENT CREATED

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