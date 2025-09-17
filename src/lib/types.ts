import { Prisma } from "@prisma/client";
import { ResumeValues } from "./validation";

export interface EditorFormProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void
}

export const resumeDataInclude = {
  workExperiences: true,
  educations: true,
} satisfies Prisma.ResumeInclude;

export type ResumeServerData = Prisma.ResumeGetPayload<{
  include: typeof resumeDataInclude;
}>;

export const marquee_banners = [
  "🌟 El mejor precio/calidad garantizado  —",
  "💲 $9,000$/hora hasta 2 personas cada uno y 8,000$/hora hasta 5 personas cada uno —",
  "📆 ¡Agenda tu clase en nuestro calendariograma!  —",
  "📞 Hablanos por whatsapp o website para mas info  —",
  "✉️ Suscribite a nuestro boletín para novedades!!!"
]

export const paragraph = ["- Dictamos la clase virtual individual desde nuestra plataforma",
  "- Recibiras un email unas horas antes de la clase con el link para que puedas acceder",
  "- Cada clase tiene una duración de 60 minutos.",
  "- Al finalizar recibirás una tarea personalizada para reforzar lo aprendido.",
  "- Tendras acceso a la repeticion de la clase durante 7 dias"]

export const paragraph2 = ["- Las clases tambien se dictan en grupos reducidos de hasta 5 personas",
  "- Cuando reserves la clase deberas indicarnos nombre y apellido de cada alumno asociado",
  "- Al abonar la reserva tus compañeros estaran asociado a tu codigo de referencia",
  "- Todos los integrantes del grupo recibiran la tarea personalizada"
]