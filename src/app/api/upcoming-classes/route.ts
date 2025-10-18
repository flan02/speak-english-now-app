import { db } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {


  const response = await db.virtualClass.findMany({
    where: {
      startTime: {
        gte: new Date(),
      },
    },
    orderBy: {
      startTime: "asc",
    },
    select: {
      id: true,
      maxParticipants: true,
      classType: true,
      status: true,
      startTime: true,
      endTime: true
    }
  });

  return NextResponse.json({ response });
}
