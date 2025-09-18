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
  "🌟 La clase dura 2hs, la primera es virtual y la segunda una evaluación integradora —",
  "💲 $12,000$ hasta 2 personas (cada uno) y 10,000$ hasta 5 personas (cada uno) —",
  "📆 ¡Agenda tu clase en nuestro calendariograma!  —",
  "📞 Hablanos por whatsapp o website para mas info  —",
  "✉️ Suscribite a nuestro boletín para novedades!!!"
]

export const paragraph = ["- Dictamos la clase virtual individual desde nuestra plataforma web",
  "- Contamos con webcam, tablet, lapíz digital para facilitarte la comprensión",
  "- Cada clase tiene una duración de 120 minutos. La 1er hora es la clase virtual y la 2da hora es una tarea personalizada",
  // "- La segunda hora es una tarea personalizada para reforzar lo aprendido.",
  "- Tendras acceso a la repeticion de la clase virtual durante 7 dias. Recibiras la corrección de la tarea al finalizar la clase"]

export const paragraph2 = ["- Las clases tambien se dictan en grupos reducidos de hasta 5 personas",
  "- Cuando reserves la clase deberas indicar nombre y apellido de cada alumno que te acompañe",
  "- Al abonar la reserva tus compañeros estarán asociados a tu codigo de referencia",
  "- Todos los integrantes del grupo recibirán la tarea personalizada, en la 2da hora de clase"
]