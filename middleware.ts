// middleware.ts (o middleware.js) en la raíz del proyecto
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const allowedOrigins = [
  'http://localhost:3000',
  'https://speak-english-now-app-git-test-prod-flan02s-projects.vercel.app',
  'https://hablainglesya.xyz'
];

// Función auxiliar para normalizar y validar el origen
function getValidOrigin(origin: string | null) {
  if (!origin) return null;
  const cleanOrigin = origin.replace(/\/$/, ''); // eliminar barra final si existe
  return allowedOrigins.includes(cleanOrigin) ? cleanOrigin : null;
}

export function middleware(request: NextRequest) {
  const origin = getValidOrigin(request.headers.get('origin'));
  console.log("[CORS Middleware] Request Method:", request.method, "Origin:", origin);
  // Preflight
  // Preflight OPTIONS
  if (request.method === 'OPTIONS') {
    const response = NextResponse.next();
    if (origin) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    }
    response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    return response;
  }

  const response = NextResponse.next();

  if (origin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  } else {
    console.warn('[CORS Middleware] Origen no permitido:', request.headers.get('origin'));
  }

  return response;
}

export const config = {
  matcher: "/api/:path*"
};
