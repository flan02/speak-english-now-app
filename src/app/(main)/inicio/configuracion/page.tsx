import H1 from '@/components/html/h1'
import { Settings, ToggleLeftIcon } from 'lucide-react'
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



type Props = {}

const Configuracion = (props: Props) => {
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
            <ToggleClient />

            <Button asChild variant='default' className='w-full lg:w-auto bg-black text-white btn-dark'>
              <Link href='/inicio/facturacion'>
                ver facturacion
              </Link>
            </Button>

          </CardContent>
        </Card>

      </section>

    </>
  )
}

export default Configuracion