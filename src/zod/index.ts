import { z } from 'zod'

export const TicketSchema = z.object({
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 carácteres" }).max(500, { message: "El mensaje no puede superar los 500 carácteres" }),
})


