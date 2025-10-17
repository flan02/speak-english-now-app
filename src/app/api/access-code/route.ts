import { auth } from "@/auth";
import { addParticipant, getGoogleMeetLink } from "@/services/functions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

  const session = await auth()

  try {
    const body = await request.json();
    const { accessCode } = body;

    const response = await getGoogleMeetLink(accessCode);

    if (response) {
      const guestResponse = await addParticipant(response, session?.user?.id!);
      console.log(guestResponse);
    }

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Google Meet link:", error);
    return NextResponse.json({ error: "Failed to fetch Google Meet link" }, { status: 500 });
  }


}

// * GOOGLE WEBHOOK
/* 
await calendar.events.watch({
  calendarId: 'primary',
  requestBody: {
    id: 'unique-channel-id',
    type: 'web_hook',
    address: 'https://tu-backend.com/google-webhook',
  },
});


*/