import { auth } from "@/auth";
import { addParticipant, getGoogleMeetLink } from "@/services/functions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

  const session = await auth()
  let response
  try {
    const body = await request.json();

    response = await getGoogleMeetLink(body);

    // TODO: Create a fc that avoid multiple meeting at the same time (Only validated in frontend)


    if (response?.bookedById === session?.user?.id!) {
      return NextResponse.json({ response: { message: "El creador de la clase no puede unirse como participante" } });
    }

    if (response?.endTime) {
      const now = new Date();
      const endTime = new Date(response.endTime);
      if (now > endTime) {
        return NextResponse.json({ response: { message: "La clase ya ha finalizado." } });
      }
    }

    if (response == null) {
      return NextResponse.json({ response: { message: `No se encontro ninguna clase asociada a este codigo: ${body}` } });
    }

    if (response) {
      const guestResponse = await addParticipant(response, session?.user?.id!);
      response = guestResponse
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