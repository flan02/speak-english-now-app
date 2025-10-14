"use server"

import { db } from "@/db";
import { $Enums } from "@prisma/client";
import { google } from "googleapis";
import { start } from "repl";

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
    description: `La clase sera ${isGroupClass ? 'grupal' : 'individual'} con x${studentsCount == 0 ? 1 : studentsCount} participantes`,
    start: {
      dateTime: start,
      timeZone: 'America/Argentina/Buenos_Aires',
    },
    end: {
      dateTime: end,
      timeZone: 'America/Argentina/Buenos_Aires',
    },
    transparency: "opaque", // Esto marca el horario como ocupado
  }
  // attendeeEmail: "chanivetdan@hotmail.com"
  console.log('user data in createGoogleCalendarEvent:', userData);


  try {
    const response = await calendar.events.insert({
      calendarId,
      requestBody: bookingClass
    });

    console.log("Evento creado en Google Calendar:", response.data);
    const eventLink = response.data.htmlLink;

    // TODO: CALL DB TO SAVE EVENT DATA

    return response.data;

  } catch (error) {
    console.error("Error creating calendar event:", error);
    throw error;
  }
}


export async function saveGoogleCalendarEvent(googleCalendarEvent: any) {
  // TODO: MUST CREATE A NEW MODEL IN PRISMA FOR SAVING ACTIVITIES GENERATED WITH AI

  // Parsing string date to format date
  // const startDate = new Date(start);
  // const endDate = new Date(end);
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