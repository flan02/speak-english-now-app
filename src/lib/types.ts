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
  "💲 $12,000$/hora para 1 o 2 personas cada uno y 10,000$/hora para 3 o 4 personas cada uno —",
  "📆 ¡Agenda tu clase en nuestro calendariograma!  —",
  "📞 Hablanos por whatsapp o website para mas info  —",
  "✉️ Suscribite a nuestro boletín para novedades!!!"
]