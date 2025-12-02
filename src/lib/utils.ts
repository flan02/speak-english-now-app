import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ScheduleClassProps } from "./types";



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toArgentinaTZ(date: Date) {
  let offsetTZ = 3
  if (process.env.NODE_ENV === "development") {
    offsetTZ = 0
  }

  const timezone = new Date(date.getTime() - offsetTZ * 60 * 60 * 1000);
  return timezone
}

// export function force3hsTZ(date: Date) {
//   const offsetTZ = 3
//   const timezone = new Date(date.getTime() - offsetTZ * 60 * 60 * 1000);
//   return timezone
// }

export function toGoogleDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Mantiene tu hora local (ej: 20:00) y agrega el offset correcto
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}-03:00`;
}

export function fileReplacer(key: unknown, value: unknown) {
  return value instanceof File
    ? {
      name: value.name,
      size: value.size,
      type: value.type,
      lastModified: value.lastModified
    }
    : value
}

export function isSessionActive(exp: number): boolean {
  const currentTime = Math.floor(Date.now() / 1000) // in seconds
  return exp > currentTime
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000) // in milliseconds
  return date.toLocaleString() // e.g. 9/17/2021, 1:00:00 PM
}

export function getTimeRemaining(exp: number, unit: "d" | "h" | "m" | "s") {
  const currentTime = Math.floor(Date.now() / 1000) // in seconds
  const secondsRemaining = exp - currentTime
  if (secondsRemaining <= 0) return 0
  switch (unit) {
    case "d":
      return Math.floor(secondsRemaining / 86400)
    case "h":
      return Math.floor(secondsRemaining / 3600)
    case "m":
      return Math.floor(secondsRemaining / 60)
    case "s":
    default:
      return secondsRemaining
  }
}

export function getFormattedTimeRemaining(exp: number): string {
  const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos (UNIX timestamp)
  const timeRemainingInSeconds = exp - currentTime; // Calcula el tiempo restante en segundos

  if (timeRemainingInSeconds <= 0) {
    return "El token ya ha expirado";
  }

  const days = Math.floor(timeRemainingInSeconds / (60 * 60 * 24));
  const hours = Math.floor((timeRemainingInSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((timeRemainingInSeconds % (60 * 60)) / 60);
  const seconds = timeRemainingInSeconds % 60;

  // Formatear el resultado
  return `${days > 0 ? `${days}d ` : ""}${hours}h ${minutes}m ${seconds}s`;
}

export function cutId(id: string): string {
  if (!id || id.length < 10) return id; // por seguridad
  return id.slice(-10); // toma los últimos 10 caracteres
}

export function calcularTiempoRestante(fechaFutura: Date): string {
  const ahora = new Date();
  const diferencia = fechaFutura.getTime() - ahora.getTime();

  if (diferencia <= 0) {
    return "La clase ya ha comenzado";
  }

  const minutosTotales = Math.floor(diferencia / (1000 * 60));
  const dias = Math.floor(minutosTotales / (60 * 24));
  const horas = Math.floor((minutosTotales % (60 * 24)) / 60);
  const minutos = minutosTotales % 60;

  // Construir el mensaje dinámicamente
  const partes: string[] = [];
  if (dias > 0) partes.push(`${dias} día${dias > 1 ? "s" : ""}`);
  if (horas > 0) partes.push(`${horas} h${horas > 1 ? "s" : ""}`);
  if (minutos > 0) partes.push(`${minutos} min${minutos > 1 ? "s" : ""}`);

  // return `Faltan ${partes.join(", ").replace(/, ([^,]*)$/, " y $1")}`;
  return `${partes.join(", ").replace(/, ([^,]*)$/, " y $1")}`;
}

export const customDate = (date: Date) => {
  const d = date.getDate().toString().padStart(2, "0")
  const m = (date.getMonth() + 1).toString().padStart(2, "0")
  const y = date.getFullYear()
  const h = date.getHours().toString().padStart(2, "0")
  const min = date.getMinutes().toString().padStart(2, "0")
  return `${d}/${m}/${y} - ${h}:${min} hs`
}

export const validateMeetingDate = (date: string, startTime: string, endTime: string): boolean => {
  const [day, month, year] = date.split('/').map(Number);
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  // AR = UTC-3 → pasamos todo a UTC sumando +3
  const meetingStart = new Date(Date.UTC(
    year,
    month - 1,
    day,
    startHour + 3,
    startMinute
  ));

  const meetingEnd = new Date(Date.UTC(
    year,
    month - 1,
    day,
    endHour + 3,
    endMinute
  ));

  const now = new Date(); // siempre te da UTC en Vercel, TZ local en dev

  if (now >= meetingEnd) return false;

  const oneHourBefore = new Date(meetingStart.getTime() - 60 * 60 * 1000);

  return now >= oneHourBefore && now < meetingEnd;
};

export const formatUTCDate = (dateString: string) => {
  const d = new Date(dateString);
  // Obtiene valores en UTC, no se desplaza según timezones
  const day = String(d.getUTCDate()).padStart(2, "0");
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const year = d.getUTCFullYear();

  return `${day}/${month}/${year}`;
};

export const scheduleClass = ({ info, setOpen, setSelectedDate }: ScheduleClassProps) => {
  const clicked = info.date; // es un objeto Date de FullCalendar
  const today = new Date();

  // Comparamos solo año, mes y día
  const clickedYMD = clicked.getFullYear() * 10000 + (clicked.getMonth() + 1) * 100 + clicked.getDate();
  const todayYMD = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

  // Bloqueamos solo si es anterior a hoy
  if (clickedYMD < todayYMD) return;

  // Bloquear domingos
  if (clicked.getDay() === 0) return;

  // Día válido → abrir modal
  setSelectedDate(info.date.toISOString().slice(0, 10));
  setOpen(true);
}


export const removePastDays = (arg: any) => {
  const cellDate = new Date(arg.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  cellDate.setHours(0, 0, 0, 0);

  if (cellDate < today) {
    return ["bg-gray-600/10 bg-previous-day", "pointer-events-none"]; // gris y deshabilitado
  }
  return [];
}


export const formattedDate = (date: string): string => {
  const formatted = new Date(date).toLocaleDateString('es-AR', { timeZone: 'UTC' })
  return formatted
}

export const translateDifficulty = (difficulty: string): string => {
  switch (difficulty) {
    case 'easy':
      return 'Basico';
    case 'medium':
      return 'Intermedio';
    case 'hard':
      return 'Avanzado';
    default:
      return difficulty; // en caso de que no coincida, devolver el original
  }
}


export const translateType = (type: string): string => {
  switch (type) {
    case 'exam':
      return 'Examen';
    case 'audio':
      return 'Audio';
    case 'video':
      return 'Video';
    case 'reading':
      return 'Lectura';
    default:
      return type; // en caso de que no coincida, devolver el original
  }
}


export function normalizeUrl(base: string, path: string) {
  const cleanBase = base.replace(/\/+$/, '');   // elimina barras finales del base
  const cleanPath = path.replace(/^\/+/, '');   // elimina barras iniciales del path
  return `${cleanBase}/${cleanPath}`;
}

export function generateTicketId() {
  // Opción simple: Timestamp (ms) + 3 números random = 16 caracteres aprox
  // Esto asegura que sea cronológico y único
  const timestamp = Date.now().toString(); // ~13 caracteres
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${timestamp}${random}`;
}

export function translateTicketStatus(status: string): string {
  switch (status) {
    case 'OPEN':
      return 'Abierto';
    case 'IN_PROGRESS':
      return 'En Progreso';
    case 'RESOLVED':
      return 'Resuelto';
    case 'CLOSED':
      return 'Cerrado';
    default:
      return status;
  }
}