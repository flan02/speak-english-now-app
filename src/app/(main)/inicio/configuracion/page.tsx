
import H1 from '@/components/html/h1'
import { Settings } from 'lucide-react'
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import ToggleClient from '@/components/reutilizable/ToggleClient'
import { auth } from '@/auth'
import EditUserInfo from '@/components/configuracion/EditUserInfo'


type Props = {}

const Configuracion = async (props: Props) => {
  const session = await auth()

  return (
    <>
      <div className='flex mt-4 xl:mt-0 2xl:mt-0 space-x-2 xl:space-x-4 2xl:space-x-4 items-end justify-center xl:justify-start 2xl:justify-start'>
        <Settings className='mb-0.5' />
        <H1 title='Configuracion' />
      </div>
      <section className='space-y-4 mx-1'>
        <Card className='w-full border border-card py-8 space-y-4'>
          <CardContent className='space-y-4'>
            <ToggleClient />
            <div className='flex space-x-2'>
              <p className='font-roboto underline font-bold uppercase text-xs'>id de usuario:</p>
              <span className='!no-underline !lowercase text-xs font-roboto mt-0.25'>#{session?.user.id}</span>
            </div>
            <div className='flex space-x-2'>
              <p className='font-roboto underline font-bold uppercase text-xs'>nombre de usuario:</p>
              <span className='!no-underline !lowercase text-xs font-roboto mt-0.25'>{session?.user.name}</span>
            </div>
            <div className='flex space-x-2'>
              <p className='font-roboto underline font-bold uppercase text-xs'>email de usuario:</p>
              <span className='!no-underline !lowercase text-xs font-roboto mt-0.25'>{session?.user.email}</span>
            </div>
            <EditUserInfo />
          </CardContent>
        </Card>

      </section>

    </>
  )
}

export default Configuracion

