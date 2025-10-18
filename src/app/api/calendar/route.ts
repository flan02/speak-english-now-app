import { NextRequest, NextResponse } from "next/server";
import { KY, Method } from '@/services/api'
import { calendarEvent } from "@/lib/types";
import { google } from "googleapis";
import { createGoogleCalendarEvent, listEvents, saveGoogleCalendarEvent } from "@/services/functions";
import { auth } from "@/auth";


export async function GET() {
  const calendarId = process.env.CALENDAR_ID!;
  const apiKey = process.env.CALENDAR_API_KEY!;
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

    // ? Required when using service account
    // const auth = new google.auth.GoogleAuth({
    //   credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!),
    //   scopes: ['https://www.googleapis.com/auth/calendar']
    // });

    const auth = new google.auth.OAuth2(
      process.env.AUTH_GOOGLE_ID,
      process.env.AUTH_GOOGLE_SECRET
    );
    auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

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
