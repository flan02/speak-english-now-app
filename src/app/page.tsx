import { auth } from "@/auth";
import resumePreview from "../../public/resume-preview.png";
import people_talking from "../../public/people-talking.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import SignIn from "@/components/reutilizable/sign-in";
import { isSessionActive } from "@/lib/utils";

import { redirect } from "next/navigation";
import { ArrowBigRight, BrainIcon, LanguagesIcon } from "lucide-react";
import ThemeToggle from "@/components/reutilizable/ThemeToggle";



export default async function Home() {
  const session = await auth()
  //console.log(session?.user)
  if (session?.user?.exp && isSessionActive(parseInt(session?.user.exp))) {
    redirect("/resumes")
  }
  return (
    <main className="flex flex-col items-center justify-center gap-6 px-5 py-4 text-center h-full">
      <section className="gap-6 px-5 py-48 text-center md:text-left md:flex justify-center items-center lg:gap-12">
        {/* NAVBAR */}
        <div className="absolute right-3 top-2 space-x-2 ">
          <span className="font-bold uppercase text-xs">cambiar tema</span>
          <ThemeToggle />
        </div>
        <div className="max-w-prose space-y-6">
          <div className="flex items-end space-x-4">
            <div className="w-full flex items-end">
              {/* <BrainIcon fill="rgb(168 85 247 / 0.8)" className="pr-2 text-purple-500/70 size-20" /> */}
              <LanguagesIcon className="pr-2 text-purple-500/70 size-20" />
              <h1 className="text-3xl lg:text-5xl font-bold text-lime-950">HABLA</h1>
              <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">INGLES</h1>
              <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">YA</h1>
            </div>
          </div>
          <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-3xl dark:text-blue-950">
            Usamos el metodo de aprendizaje rápido{" "}
            <span className="inline-block bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">
              Weak-Form
            </span>{" "}
            para que te comuniques en Inglés fluido
          </h1>

          <p className="text-sm lg:text-lg text-gray-500 font-mono"><span className="font-bold">APOYO ESCOLAR GUIADO</span> primario, secundario, universitario</p>
          <p className="text-sm lg:text-lg text-gray-500 font-mono"><span className="font-bold uppercase dark:text-gray-500">Clases de conversación práctica</span> para ganar fluidez y confianza</p>

          {/* HERE OPEN A MODAL COMPONENT GIVE SOME INFO ABOUT THE PROJECT */}
          {/* <Button asChild size="lg" variant="default" className="text-xs px-2 lg:px-4 lg:text-sm bg-gray-300 hover:bg-gray-300/80 dark:bg-blue-950/80 dark:hover:bg-blue-950 text-gray-500 dark:text-muted-foreground">
            <Link href="/resumes">Conoce más ...</Link>
          </Button> */}

          <div>
            <SignIn />
          </div>
        </div>
        <div className="hidden lg:block">
          <Image
            src={people_talking}
            alt="people talking"
            width={600}
            className="shadow-md rounded-md border-gray-900" // lg:rotate-[1.5deg]
            priority
          />
        </div>
      </section>
      <section>SECTION 2: Información sobre clases virtuales y precios, cantidad de alumnos</section>
      <section>SECTION 3: Metodología de enseñanza</section>
      <section>SECTION 4: Calendario de clases</section>
      <section>SECTION 5: Formas de pago y Reservas con transferencias 50% por adelantado y 50% al iniciar la clase</section>
      <section>SECTION 6: Sobre mi, links a mis redes, sitio web</section>
      <section>SECTION 7: consultas, suscribirse, solicitar ticket descuento</section>
    </main>
  );
}
