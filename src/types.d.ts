
declare module 'types' {
  export type User = {
    name: string
    email: string
    image: string
  }
}

declare module '*.css';

export declare global {
  interface Window {
    MercadoPagoBricks: (options: { locale: string }) => any;
    MercadoPago: new (publicKey: string, options?: { locale?: string }) => any;
  }
}