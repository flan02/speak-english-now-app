

import { updateUserData } from "@/services/functions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  body.id = "68c05c971d92f7d0b8db1d8d"

  const response = await updateUserData(body)

  console.log('response user data api route:', response);
  return NextResponse.json({ message: 'User data received', data: response }, { status: 200 });
}