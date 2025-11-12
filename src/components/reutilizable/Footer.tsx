/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { QRCodeCanvas } from "qrcode.react"
import React from 'react'
import { Icons } from './Icons'
import { ArrowRight, Globe, LanguagesIcon, Linkedin } from 'lucide-react'
import { socialMediaUrlHablaIngles } from "@/lib/types"
import Link from "next/link"

type Props = {}

type LiIconsProps = {
  component: React.ReactNode
  icon_name?: string
  socialMediaUrl: string
}


const LiIcons = (props: LiIconsProps) => {
  return (
    <li>
      <a href={`${props.socialMediaUrl}`} className="flex items-center space-x-3 hover:text-purple-500 transition" referrerPolicy='no-referrer' rel='noopener' target='_blank'>
        {props.component}
        <span className='capitalize'>{props.icon_name}</span>
      </a>
    </li>
  )
}

const links = [
  {
    name: "Inicio",
    url: "#"
  },
  {
    name: "Sobre mi",
    url: "#about"
  },
  {
    name: "Guía",
    url: "guia"
  }
]

const groupIcons: { [key: string]: React.ReactNode } = {
  github: <Icons.github key={0} />,
  youtube: <Icons.youtube key={1} />,
  linkedin: <Linkedin key={2} size={20} />,
  website: <Globe key={3} />
}



const Footer = (props: Props) => {
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL!
  return (
    <footer className="relative py-20 flex flex-col items-center bg-yellow-50 bg-footer overflow-hidden md:py-40">
      <div className="relative z-[1] m-auto px-6 md:px-12 lg:px-0">

        <div className="m-auto md:w-10/12 lg:w-9/12 xl:w-full">
          <div className="flex flex-wrap items-center justify-between md:flex-nowrap lg:space-x-16">
            <div className="w-full space-x-12 flex justify-center text-gray-300 sm:w-7/12 md:justify-start">
              <ul className="list-inside space-y-8">
                {
                  links.map((link, index) => (
                    <li key={index} className='flex font-roboto space-x-2 items-end hover:text-purple-500 dark:text-zinc-700 dark:hover:text-purple-500'>
                      <ArrowRight />
                      <Link href={`/${link.url}`} className="transition">{link.name}</Link></li>
                  ))
                }

              </ul>

              <ul role="list" className="space-y-8 dark:text-zinc-700 font-roboto">
                {
                  Object.keys(groupIcons).map((key, index) => (
                    <LiIcons key={key} component={groupIcons[key]} icon_name={key} socialMediaUrl={socialMediaUrlHablaIngles[index]} />
                  ))
                }

              </ul>
            </div>
            <div className="w-10/12 m-auto mt-10 space-y-6 text-center sm:text-left sm:w-5/12 sm:mt-auto">
              <div className="flex flex-col items-center">
                <p className="text-xs text-muted-foreground mb-2">Escanea este código para visitar nuestra página en tu móvil</p>

                <QRCodeCanvas
                  value={siteUrl}
                  size={128} // Tamaño del QR
                  bgColor="#ffffff"
                  fgColor="#000000"
                />
              </div>

              <div className="flex items-center justify-center">
                <LanguagesIcon fill="" className="pr-2 size-8" />
                <span className="block text-muted-foreground underline underline-offset-4 font-bold">HABLAINGLESYA &copy; {new Date().getFullYear()}</span>
              </div>

              <div className="flex flex-col justify-between space-y-3 text-xs lg:text-base xl:text-base 2xl:text-base xl:space-y-1">
                <a href="/tos" className="font-mono underline underline-offset-4 dark:text-zinc-700">Términos de uso</a>
                <a href="/privacidad" className="font-mono underline underline-offset-4 dark:text-zinc-700">Políticas de privacidad</a>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute h-full inset-0 flex items-center">
        <div aria-hidden="true" className="w-56 h-56 m-auto blur-xl rounded-full md:w-[30rem] md:h-[30rem] md:blur-3xl"></div>
      </div>
      <div aria-hidden="true" className="absolute inset-0 w-full h-full opacity-80"></div>
    </footer>


  )
}

export default Footer