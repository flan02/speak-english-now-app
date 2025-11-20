import { db } from "@/db";

export async function getBillingHistory(userId: string) {
  try {

    const response = await db.paymentMercadoPago.findMany({
      where: { userId },
      select: {
        status: true,
        price: true,
        createdAt: true,
        preferenceId: true,
        type: true,
        maxParticipants: true,
      }
    })
    return response
  } catch (error) {
    console.error("Error fetching billing history", error)
    return null
  }
}