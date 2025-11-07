import React from 'react'
import MaxWidthWrapper from '../reutilizable/MaxWidthWrapper'
import Image from 'next/image'
import Yo from '../../../public/yo.jpg'
import { GitHubButton, LinkedInButton, MyWebsiteButton } from '../reutilizable/ButtonsCustom'

type Props = {}

const Section5 = (props: Props) => {
  return (
    <MaxWidthWrapper className='lg:space-y-16'>
      <h2 className="mb-0 text-3xl pt-16 pb-8 lg:text-5xl font-bold lg:mb-16 lg:py-0 text-center tracking-wider">Nuestra Misión</h2>
      <section className='px-1 lg:px-6'>
        <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between">
          <Image src={Yo} alt="Foto Perfil" className='rounded-full mx-auto lg:mx-0 size-20 lg:size-28 border-2 border-black' />
          <p className='font-orbitron text-xs leading-4.5 lg:pt-1 lg:leading-6 lg:text-lg text-left tracking-wide md:w-[86%]'>Soy Dan Chanivet un programador web argentino con más de 7 años de experiencia en el desarrollo de aplicaciones y sitios web modernos. He trabajado durante 3 años de forma remota para empresas de Estados Unidos, y me comunico tanto en español como en inglés de manera fluida.</p>
        </div>
        <p className='font-orbitron text-xs leading-4.5 lg:leading-6 lg:text-lg text-left py-4'>Construí esta plataforma como una solución de bajo costo para ayudar a niños, adolescentes y adultos a aprender lograr comunicarse en inglés de una manera sencilla. Ya sea apoyo escolar, preparar entrevistas laborales o clases conversacionales sobre diversos temas, dispongo de varias horas semanales para brindarte la ayuda que necesites.</p>
        <p className='font-orbitron text-xs leading-4.5 lg:leading-6 lg:text-lg text-left lg:mt-2'>Continuo diariamente con mi formación en la programación con inteligencia artificial así como en el inglés. Si queres conocer más sobre mí te comparto los siguientes enlaces donde verás proyectos que he realizado y mis certificaciones obtenidas como programador:</p>
      </section>
      <article className='min-w-[340px] lg:w-1/3 -ml-1 lg:mx-auto space-y-2 lg:space-y-4'>

        <MyWebsiteButton />
        <LinkedInButton />
        <GitHubButton />


      </article>
    </MaxWidthWrapper>
  )
}

export default Section5



