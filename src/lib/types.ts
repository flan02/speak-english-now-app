import { BookAIcon, Bot, Calendar, Computer, Home, Settings } from "lucide-react"
import { Session } from "next-auth"


export const marquee_banners = [
  "🌟 La clase dura 2hs, la primera es virtual y la segunda una evaluación integradora —",
  "💲 $12,000$ hasta 2 personas (cada uno) y 10,000$ hasta 5 personas (cada uno) —",
  "📆 ¡Agenda tu clase en nuestro calendario!  —",
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
  "https://danchanivet.me",
]

export const socialMediaUrlHablaIngles: string[] = [
  "https://www.github.com/flan02",
  "https://www.youtube.com/@flan_02",
  "https://www.linkedin.com/in/dan-chanivet-574084b2/",
  "https://curriculumvitae-woad.vercel.app/"
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
      url: "/inicio/principal",
      icon: Home,
    },
    {
      title: "Clases Virtuales",
      url: "/inicio/mis-clases-virtuales",
      icon: Computer
    },
    {
      title: "Actividades",
      url: "/inicio/mis-actividades",
      icon: Bot
    },
    {
      title: "Calendario",
      url: "/inicio/calendario",
      icon: Calendar,
    },
    {
      title: "Reservas",
      url: "/inicio/reservas",
      icon: BookAIcon,
    },
    {
      title: "Configuracion",
      url: "/inicio/configuracion",
      icon: Settings,
    }
  ]


export const nivelIngles = [
  "inicial",
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
  googleEventId: string
  bookedById: string
  accessCode: string
  startTime: Date
  endTime: Date
  maxParticipants: number
  currentParticipants: number
  classType: 'individual' | 'grupal'
  classPrice: number
  htmlLink: string
  status: 'scheduled' | 'completed' | 'cancelled'
  summary: string
  description: string
  learningFocus: string
  hostType: 'anfitrion' | 'invitado'
  participantsIds: string[]
}



export type MisClasesVirtualesProps = {
  session: Session["user"];
};

export type User = {
  name: string
  email: string
  image: string
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
  actividad: 'uploaded' | 'pending'
  actividadId?: string
  createdAt: Date
  updatedAt: Date
}