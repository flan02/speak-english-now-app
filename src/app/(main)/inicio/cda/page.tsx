"use server"
import SupportForm from '@/components/cda/SupportForm'
import TutorialsList from '@/components/cda/TutorialList'
import H1 from '@/components/html/h1'
import { Card } from '@/components/ui/card'
import { URL_ROUTES } from '@/services/api/routes'
import { ArrowLeftCircle, HelpCircle, School } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const CentroDeAyuda = async (props: Props) => {


  return (
    <>
      <div className='flex justify-between mt-4 xl:mt-0 2xl:mt-0 space-x-2 xl:space-x-4 2xl:space-x-4 items-end xl:justify-between 2xl:justify-between'>
        <div className='flex items-end space-x-2 px-2 lg:px-0'>
          <HelpCircle className='mb-0.5 md:mb-1' />
          <H1 title='Centro de Ayuda' />
        </div>
        <Link href={`${URL_ROUTES.CONFIG}`} className='underline px-2 lg:px-0 mb-0.5 md:mb-0'>
          <ArrowLeftCircle />
        </Link>
      </div>
      <h2 className='font-roboto font-bold px-2 xl:px-0 2xl:px-0 text-xs xl:text-base 2xl:text-base'>Aquí podras contactar con el soporte de nuestra app y acceder a tutoriales para usar la plataforma.</h2>
      <Card className='xl:w-full border border-card mx-1 py-6 px-1'>
        <article className='flex flex-col space-y-6 px-2 lg:px-4'>
          <SupportForm />
        </article>

        <article className="mt-12 px-2 lg:px-4 h-full">
          <div className="text-center mb-6">
            <div className='font-bold text-xs lg:text-sm font-roboto flex space-x-2'>
              <School />
              <h3 className="mt-1.5 text-sm">Tutoriales</h3>
            </div>
            <p className="text-muted-foreground text-xs lg:text-sm font-roboto mt-4 md:mt-0">Aprende a usar la plataforma con nuestras guías rápidas.</p>
          </div>
          <TutorialsList />
        </article>
      </Card>
    </>
  )
}

export default CentroDeAyuda
