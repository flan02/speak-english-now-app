import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto, Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/reutilizable/Footer";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: {
    template: "%s - HablaInglesYa",
    absolute: "HablaInglesYa"
  },
  description: "Aprende Ingles sin fraccionar el contenido, con nuestro metodo simple y eficaz.",
  openGraph: {
    title: "HablaInglesYa",
    description: "Aprende Ingles sin fraccionar el contenido, con nuestro metodo simple y eficaz.",
    url: `${process.env.BASE_URL}`,
    siteName: "HablaInglesYa",
    images: [
      {
        url: `${process.env.BASE_URL}og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "HablaInglesYa"
      }
    ],
    locale: "es_ES",
    type: "website",
  },
  authors: [
    {
      name: "Dan Chanivet",
      url: `${process.env.PERSONAL_WEBSITE}`
    }
  ]
}


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script src="https://sdk.mercadopago.com/js/v2" async ></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${orbitron.variable} antialiased`} >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
