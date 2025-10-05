
import H1 from '@/components/html/h1'
import { PenIcon, Settings, ToggleLeftIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import ToggleClient from '@/components/reutilizable/ToggleClient'
import { auth } from '@/auth'
import EditUserInfo from '@/components/configuracion/EditUserInfo'



type Props = {}

const Configuracion = async (props: Props) => {
  const session = await auth()
  return (
    <>
      <div className='flex space-x-4 items-end lg:mt-0 mt-2'>
        <Settings className='mb-0.5' />
        <H1 title='Configuracion' />
      </div>
      <section className='space-y-4'>
        <Card className='w-full border border-card py-8 space-y-4'>
          {/* <CardTitle className='font-roboto px-6 text-sm'>MODO OSCURO:</CardTitle> */}
          <CardContent className='space-y-4'>
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

/* 
 <select name="" id="" className='font-roboto text-xs border border-gray-300 dark:bg-black'>
                <option value=""></option>
                <option value="inicial">inicial</option>
                <option value="basico">basico</option>
                <option value="intermedio">intermedio</option>
                <option value="avanzado">avanzado</option>
              </select>
              <button className='flex bg-red-500 px-2 py-0.5 rounded-md space-x-2'>
                <PenIcon className='size-4' size={12} color='white' />
                <span className='text-xs text-white'>Editar</span>
              </button>
*/