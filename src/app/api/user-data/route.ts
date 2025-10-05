

import { auth } from "@/auth";
import { getUserData, updateUserData } from "@/services/functions";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await auth()

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const response = await getUserData({ id: session?.user.id })
    return NextResponse.json(response)
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}


export async function POST(request: NextRequest) {
  const body = await request.json();
  const session = await auth()

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  body.id = session?.user.id

  console.log('body received in user data api route:', body);

  const response = await updateUserData(body)

  //console.log('response user data api route:', response);
  return NextResponse.json({ message: 'User data received', data: response }, { status: 200 });
}