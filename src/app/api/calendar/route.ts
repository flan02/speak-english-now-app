import { NextRequest, NextResponse } from "next/server";
import { KY, Method } from '@/services/api'
import { calendarEvent } from "@/lib/types";
import { google } from "googleapis";
import { createGoogleCalendarEvent, findVirtualClass, listEvents, updateVirtualClass } from "@/services/functions";


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

// TODO: Call this fc from webhook and update filtering by preferenceId
export async function POST(request: NextRequest) {

  try {
    const { preferenceId } = await request.json();
    if (!preferenceId) {
      return NextResponse.json({ error: "Missing preferenceId" }, { status: 400 });
    }
    const calendarId = process.env.CALENDAR_ID!;

    const auth = new google.auth.OAuth2(
      process.env.AUTH_GOOGLE_ID,
      process.env.AUTH_GOOGLE_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    )
    auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

    const body = await findVirtualClass(preferenceId)

    if (!body?.success) {
      return NextResponse.json({ error: "Virtual class not found" }, { status: 404 });
    }

    const calendar = google.calendar({ version: 'v3', auth });

    // TODO: Create events in google calendar api
    const googleCalendarEvent = await createGoogleCalendarEvent(calendarId, calendar, body.response);

    if (googleCalendarEvent?.success) {
      await updateVirtualClass(googleCalendarEvent.response, body.response);
    }

    // * TESTING: List of my current events (Useful for paneladmin purposes)
    //listEvents();

    return NextResponse.json({ success: true, message: "Event created successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create calendar event' }, { status: 500 });
  }
}

// ? Required when using service account
// const auth = new google.auth.GoogleAuth({
//   credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!),
//   scopes: ['https://www.googleapis.com/auth/calendar']
// });
