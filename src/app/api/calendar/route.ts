import { NextRequest, NextResponse } from "next/server";
import { KY, Method } from '@/services/api'
import { calendarEvent } from "@/lib/types";
import { google } from "googleapis";


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

  const bookingData = {
    summary: "Clase individual",
    description: "Clase reservada por Juan Pérez, payment ID: TEST1234",
    start: "2025-10-14T17:00:00-03:00",
    end: "2025-10-14T18:00:00-03:00",
    attendeeEmail: "chanivetdan@hotmail.com"
  }

  const event = {
    summary: bookingData.summary,
    description: bookingData.description,
    start: { dateTime: bookingData.start, timeZone: "America/Argentina/Buenos_Aires" },
    end: { dateTime: bookingData.end, timeZone: "America/Argentina/Buenos_Aires" },
    attendees: [{ email: bookingData.attendeeEmail }]
  };

  try {
    // const body = await request.json();
    const calendarId = process.env.CALENDAR_ID!;
    // const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}`;

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!),
      scopes: ['https://www.googleapis.com/auth/calendar']
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // TODO: Create events in google calendar api
    //const response = await calendar.events.insert({ calendarId, requestBody: event });

    // * TESTING: List of my current events
    //async function listEvents() {
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
    //console.log("Listing google calendar api events:", response);
    // console.log("Listing google calendar api events:", response.data.items);

    //}

    // listEvents();

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create calendar event' }, { status: 500 });
  }
}