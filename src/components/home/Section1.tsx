import React from 'react'
import ThemeToggle from '../reutilizable/ThemeToggle'
import { LanguagesIcon } from 'lucide-react'
import SignIn from '../reutilizable/sign-in'
import Image from 'next/image'
import people_talking from "../../../public/people-talking.png";
import VideoPlayer from '../reutilizable/VideoPlayer'
type Props = {}

const Section1 = (props: Props) => {
  return (
    <section className="gap-6 px-5 py-40 text-center md:text-left md:flex justify-center items-center lg:gap-12">

      <div className="absolute right-3 top-2 space-x-2 z-50 mt-10">
        <span className="font-bold uppercase text-xs">cambiar tema</span>
        <ThemeToggle />
      </div>
      <div className="max-w-prose space-y-8">
        <div className="flex items-end space-x-4">
          <div className="w-full flex items-end">
            {/* <BrainIcon fill="rgb(168 85 247 / 0.8)" className="pr-2 text-purple-500/70 size-20" /> */}
            <LanguagesIcon className="pr-2 text-purple-500/70 size-20" />
            <h1 className="text-3xl lg:text-5xl font-bold text-lime-950">HABLA</h1>
            <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">INGLES</h1>
            <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">YA</h1>
          </div>
        </div>
        <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-4xl font-roboto leading-10">
          Usamos el metodo de aprendizaje rápido{" "}
          <span className="inline-block bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent font-roboto">
            Weak-Form
          </span>{" "}
          para que te comuniques en Inglés fluido
        </h1>

        <p className="text-sm lg:text-lh text-gray-500 font-roboto"><span className="font-bold font-roboto">APOYO ESCOLAR GUIADO</span> nivel primario, secundario, universitario</p>
        <p className="text-sm lg:text-xl text-gray-500 font-roboto"><span className="font-bold font-roboto uppercase dark:text-gray-500">Clases de conversación práctica</span> para ganar fluidez y confianza</p>

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
        {/* <VideoPlayer src="/gifs/sprite-stars.webm" alt="Sprite Stars" className="fixed top-[0.1] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-auto z-10 rounded-md" /> */}
      </div>
    </section>
  )
}

export default Section1