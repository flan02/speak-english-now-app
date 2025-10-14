import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export function toGoogleDate(date: Date) {
//   const iso = date.toISOString(); // → 2025-10-15T23:00:00.000Z
//   return iso.slice(0, 19) //+ "-03:00"; // ajusta a tu timezone local
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

