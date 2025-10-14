"use server"
import { google } from "googleapis"

export async function getUserEvents(accessToken: string) {
  const calendar = google.calendar({ version: "v3" })
  const res = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
    auth: accessToken,
  })
  return res.data.items
}


