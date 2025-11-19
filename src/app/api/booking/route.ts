import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createVirtualClass } from "@/services/functions";


export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized", status: 401 })
    }

    const userId = session.user.id;

    // const { start, end, isGroupClass, studentsCount, text, price, preferenceId } = await request.json();
    const { toGoogleCalendarEvent } = await request.json();
    console.log('Body received in booking route', toGoogleCalendarEvent);

    const { start, end, isGroupClass, studentsCount, text, price, preferenceId } = toGoogleCalendarEvent

    if (!start || !end) {
      return NextResponse.json({ error: "Missing start or end date", status: 400 })
    }

    if (!preferenceId) {
      return NextResponse.json({ error: "Missing preferenceId", status: 400 });
    }

    const bookingData = {
      start,
      end,
      classType: isGroupClass ? "grupal" : "individual",
      price: Number(price),
      maxParticipants: isGroupClass ? studentsCount : 1,
      preferenceId,
      learningFocus: text
    }
    // * Crear booking con estado "pending"
    const isbooked = await createVirtualClass(bookingData, userId)

    if (!isbooked) {
      return NextResponse.json({ error: "Failed to create booking", status: 500 })
    }

    return NextResponse.json({ success: true, status: 200 })

  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
