import React from 'react'
import ThemeToggle from '../reutilizable/ThemeToggle'
import { LanguagesIcon } from 'lucide-react'
import SignIn from '../reutilizable/sign-in'


type Props = {}

const Section1 = (props: Props) => {
  return (
    <section className="gap-6 lg:px-5 lg:py-40 min-w-[350px] py-16 text-center md:text-left md:flex justify-center items-center lg:gap-12">
      <div className="absolute right-3 top-2 space-x-2 mt-10 z-30">
        <span className="font-bold uppercase text-xs">cambiar tema</span>
        <ThemeToggle />
      </div>
      <div className="max-w-prose space-y-8">
        <div className="flex items-end space-x-4">
          <div className="w-full flex items-end pl-2 lg:pl-0 xl:pl-0 2xl:pl-0">
            <LanguagesIcon className="pr-2 text-purple-500/70 size-20" />
            <h1 className="text-3xl lg:text-5xl font-bold text-lime-950">HABLA</h1>
            <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">INGLES</h1>
            <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">YA</h1>
          </div>
        </div>
        <h1 className="px-4 lg:px-0 scroll-m-20 text-xl font-extrabold tracking-tight lg:text-4xl font-roboto leading-6 lg:leading-12">
          Usamos el metodo de aprendizaje rápido{" "}
          <span className="inline-block bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent font-roboto">
            Weak-Form
          </span>{" "}
          para que te comuniques en Inglés fluido
        </h1>

        <p className="text-[10px] xl:text-lg lg:text-base text-gray-400 font-orbitron"><span className="font-bold font-orbitron">APOYO ESCOLAR GUIADO</span> nivel primario, secundario, universitario</p>
        <p className="text-[10px] xl:text-lg lg:text-base text-gray-400 font-orbitron"><span className="font-bold font-orbitron uppercase dark:text-gray-500">Clases de conversación práctica</span> gana fluidez y confianza</p>
        <p className="text-[10px] xl:text-lg lg:text-base text-gray-400 font-orbitron"><span className="font-bold font-orbitron uppercase">Entrevistas laborales</span> preparate para comunicarte</p>

        <div>
          <SignIn />
        </div>
      </div>
      <div className="hidden lg:block">
        <img className='logo-theme' alt="logo" />
      </div>
    </section>
  )
}

export default Section1