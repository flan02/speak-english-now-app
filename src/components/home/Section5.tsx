import React from 'react'
import MaxWidthWrapper from '../reutilizable/MaxWidthWrapper'
import Image from 'next/image'
import Yo from '../../../public/yo.jpg'

type Props = {}

const Section5 = (props: Props) => {
  return (
    <MaxWidthWrapper>
      <h2 className="text-5xl font-bold lg:mb-16 text-center tracking-wider">Nuestra Misión</h2>
      <section className='px-6'>
        <div className="flex space-x-12">
          <Image src={Yo} alt="Foto Perfil" className='rounded-full size-28 ml-8' />
          <p className='font-orbitron text-lg text-left tracking-wide'>Soy Dan Chanivet un programador web argentino con más de 7 años de experiencia en el desarrollo de aplicaciones y sitios web modernos. He trabajado durante 3 años de forma remota para empresas de Estados Unidos, y me comunico tanto en español como en inglés de manera fluida.</p>
        </div>
        <p className='font-orbitron text-lg text-left py-8'>Construí esta plataforma como una solución de bajo costo para ayudar a niños, adolescentes y adultos a aprender lograr comunicarse en inglés de una manera sencilla. Ya sea apoyo escolar, preparar entrevistas laborales o clases conversacionales sobre diversos temas, dispongo de varias horas semanales para brindarte el apoyo que necesites.</p>
        <p className='font-orbitron text-lg text-left -mt-2'>Continuo diariamente con mi formación en la programación con inteligencia artificial así como en el inglés. Si queres conocer más sobre mí te comparto los siguientes enlaces donde verás proyectos que he realizado y mis certificaciones obtenidas como programador:</p>
        <article className='border border-red-500 w-1/2 mx-auto mt-4'>

          <a className='block' href="https://www.danchanivet.tech" target="_blank" rel="noopener noreferrer">https://www.danchanivet.tech</a>
          <a className='block' href="https://www.linkedin.com/in/dan-chanivet/" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/dan-chanivet/</a>
          <a className='block' href="https://github.com/dan-chanivet" target="_blank" rel="noopener noreferrer">github</a>


        </article>
      </section>
    </MaxWidthWrapper>
  )
}

export default Section5
