import { NextRequest, NextResponse } from "next/server";
import { KY, Method } from '@/services/api'
import { calendarEvent } from "@/lib/types";
import { google } from "googleapis";
import { createGoogleCalendarEvent, listEvents, saveGoogleCalendarEvent } from "@/services/functions";
import { auth } from "@/auth";


export async function GET() {
  const calendarId = process.env.CALENDAR_ID!;
  const apiKey = process.env.CALENDAR_API_KEY!;
  // const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`;
  const now = new Date().toISOString();
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${now}`;


  try {
    const response = await KY(Method.GET, url);

    const data = response.items as calendarEvent[];

    const cleanData: calendarEvent[] = data.map((ev) => ({
      start: ev.start,
      end: ev.end,
      status: ev.status,
    }))

    return NextResponse.json(cleanData);

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to fetch calendar events' }, { status: 500 });
  }
}


export async function POST(request: NextRequest) {
  let userData, userId
  const session = await auth()
  if (session?.user) {
    userData = {
      name: session?.user?.name,
      email: session?.user?.email
    }

    userId = session?.user?.id
  }

  const body = await request.json();


  try {

    const calendarId = process.env.CALENDAR_ID!;

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!),
      scopes: ['https://www.googleapis.com/auth/calendar']
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // TODO: Create events in google calendar api
    const googleCalendarEvent = await createGoogleCalendarEvent(calendarId, calendar, body, userData);

    if (userId) await saveGoogleCalendarEvent(googleCalendarEvent, userId, body);

    // * TESTING: List of my current events
    //listEvents();

    return NextResponse.json({});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create calendar event' }, { status: 500 });
  }
}


/* 

Creás la clase → Se genera:

Un classId

Un accessCode (por ejemplo: "F7K2D9QX")

Un campo maxParticipants (por ejemplo: 5)

Un contador currentParticipants = 0

Un usuario ingresa el código desde el frontend:

Enviás una request al backend /api/join-class.

El backend busca la clase con ese código.

Si currentParticipants < maxParticipants, se permite el acceso y se incrementa el contador.

Si ya se alcanzó el máximo, devolvés un mensaje tipo:

{ "error": "Cupo completo. No se permiten más participantes." }


Acceso al botón de videollamada:

Si el usuario fue aceptado, el backend responde también con el link del Meet.

En el frontend, recién ahí mostrás el botón “Unirse a la clase”.

(Opcional): Si querés más seguridad, podés registrar los emails o IDs de los usuarios que usaron el código, para evitar que se use más de una vez por la misma persona.
*/