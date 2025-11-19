import { BookAIcon, Bot, Calendar, Computer, Home, Settings } from "lucide-react"
import { Session } from "next-auth"
import pricing from "@/config/pricing.json"
import { NivelIngles } from "@prisma/client"
import { URL_ROUTES } from "@/services/api/routes"

export const marquee_banners = [
  "🌟 La clase dura 2hs, la primera es virtual y la segunda una evaluación integradora —",
  `💲 $${pricing.basePrice}$ hasta 2 personas (cada uno) y $${pricing.groupPrice}$ hasta 5 personas (cada uno) —`,
  "📆 ¡Agenda tu clase en la seccion reservas  —",
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

export const metodos_pago = [
  'MERCADO PAGO',
  'TRANSF. BANCARIA',
  'UALA',
  'BRUBANK',
  'NARANJA',
  'CRIPTO (USDT, BTC, ETH)'
]

export const socialMediaUrl: string[] = [
  "https://www.github.com/flan02",
  "https://www.twitter.com/flano2",
  "https://www.youtube.com/@flan_02",
  "https://www.facebook.com/dan.chanivet/",
  "https://www.linkedin.com/in/dan-chanivet-574084b2/",
  "https://www.twitch.tv/flano2",
  process.env.NEXT_PUBLIC_PERSONAL_WEBSITE!
]

export const socialMediaUrlHablaIngles: string[] = [
  "https://www.github.com/flan02",
  "https://www.youtube.com/@flan_02",
  "https://www.linkedin.com/in/dan-chanivet-574084b2/",
  process.env.NEXT_PUBLIC_PERSONAL_WEBSITE!
]

export const reduccionesColoquiales = [
  "Gonna = Going to",
  "Imma = I am going to",
  "Wanna = Want to",
  "Gotta = Got to",
  "Gotcha = Got you",
  "Kinda = Kind of",
  "Lemme = Let me",
  "Dunno = Don't know",
  "Outta = Out of",
  "Coulda = Could have",
  "Shoulda = Should have",
  "Woulda = Would have",
  "Y'all = You all",
  "Cuz = Because",
  "Betcha = Bet you",
  "Tryna = Trying to",
  "Finna = Fixing to",
  "Ain't = Am not / Is not / Are not / Has not / Have not"
]

type DateString = {
  dateTime: string
  timeZone: string
}
export interface calendarEvent {
  start: DateString
  end: DateString
  status: 'confirmed'
}

export type FullCalendarProps = {
  title: string;
  start: string;
  end: string;
  color?: string;
}


export // Menu items.
  const items = [
    {
      title: "Principal",
      url: URL_ROUTES.INICIO,
      icon: Home,
    },
    {
      title: "Clases Virtuales",
      url: URL_ROUTES.CLASES_VIRTUALES,
      icon: Computer
    },
    {
      title: "Actividades",
      url: URL_ROUTES.ACTIVIDADES,
      icon: Bot
    },
    {
      title: "Calendario",
      url: URL_ROUTES.CALENDARIO,
      icon: Calendar,
    },
    {
      title: "Reservas",
      url: URL_ROUTES.RESERVAS,
      icon: BookAIcon,
    },
    {
      title: "Configuracion",
      url: URL_ROUTES.CONFIG,
      icon: Settings
    }
  ]


export const nivelIngles = [
  "basico",
  "intermedio",
  "avanzado"
]

export type ScheduleClassProps = {
  info: { date: Date },
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedDate: (date: string | null) => void
  // setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>
}

export type ClassMedatadataProps = {
  type: 'individual' | 'grupal',
  studentsCount: number,
  price: number
}

export type ScheduleTimeProps = {
  start: Date | null,
  end: Date | null
}


export type CalendarEvent = {
  googleEventId: string | null
  bookedById: string | null
  accessCode: string | null
  startTime: Date
  endTime: Date
  maxParticipants: number
  currentParticipants: number
  classType: 'individual' | 'grupal'
  classPrice: number
  htmlLink: string | null
  status: 'scheduled' | 'completed' | 'pending' | 'cancelled'
  summary: string | null
  learningFocus: string | null
  hostType: 'anfitrion' | 'invitado'
  preferenceId: string | null
  participantsIds: string[] | null
}



export type MisClasesVirtualesProps = {
  session: Session["user"];
};

export type User = {
  name: string
  email: string
  image: string
  totalClasses: number
}


export type VirtualClass = {
  id: string
  googleEventId: string
  bookedById: string
  accessCode: string
  startTime: Date
  endTime: Date
  hostType: 'anfitrion' | 'invitado'
  currentParticipants: number
  maxParticipants: number
  classType: 'individual' | 'grupal'
  classPrice: number
  htmlLink: string
  status: 'scheduled' | 'completed' | 'cancelled'
  summary: string
  description: string
  learningFocus: string
  participantsIds: string[]
  activityStatus: 'uploaded' | 'pending'
  createdAt: Date
  updatedAt: Date
}


export type ActividadModel = {

  title: string
  content: string
  solvedContent: string
  description: string
  type: 'exam' | 'audio' | 'video' | 'reading'
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface formUserData {
  status: boolean
  localidad: string
  nivel: NivelIngles | ''
  telefono: number | ''
  newsletter: string
}

export type PaymentMP = {
  userId: string,
  preferenceId: string,
  amount: number,
  type: 'individual' | 'grupal',
  maxParticipants: number,
  status: 'pending' | 'approved' | 'rejected',
}