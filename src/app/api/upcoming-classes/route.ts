import { getUpcomingClasses } from "@/services/functions";
import { NextResponse } from "next/server";

export async function GET() {

  try {
    const response = await getUpcomingClasses()
    return NextResponse.json({ response });

  } catch (error) {
    console.error("We couldn't retrieve the upcoming classes", error)
  }


}
