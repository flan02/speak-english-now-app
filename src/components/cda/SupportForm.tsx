'use client'
import { useActionForm } from '@/hooks/useActionForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { HeadsetIcon, Ticket } from 'lucide-react'
import { generateTicket } from '@/app/(main)/inicio/cda/actions'
import Link from 'next/link'
import { URL_ROUTES } from '@/services/api/routes'

type Props = {}

const SupportForm = (props: Props) => {
  const { formAction: query, message: ticketMessage, pending: queryPending } = useActionForm(generateTicket)
  return (
    <>
      <div className='font-bold text-xs lg:text-sm font-roboto flex space-x-2'>
        <HeadsetIcon />
        <p className='mt-1 lg:mt-0.5'>Contacta con el soporte para que te generemos un ticket y podamos ayudarte</p>
      </div>
      <div className='flex flex-col items-center space-y-4 font-roboto'>
        <Button asChild variant='default' className='w-[200px] lg:w-auto bg-highlight text-xs mr-1 self-center lg:self-end'>
          <Link href={URL_ROUTES.TICKETS}>
            <Ticket />
            <span>ver tickets</span>
          </Link>
        </Button>
        <form action={query} className="flex flex-col gap-4 text-sm items-center justify-center w-full lg:w-[500px]">
          <FieldGroup className=''>
            {/* Honeypot field - CAZABOBOS */}
            <div className="hidden" aria-hidden="true">
              <FieldLabel>Website URL</FieldLabel>
              <Input name="website_url" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <Field className='w-full lg:w-[500px]'>
              <FieldLabel className="font-bold font-roboto text-xs lg:text-sm"></FieldLabel>
              <Textarea name="textarea" rows={4} placeholder="Describenos tu situacion..." className="text-xs lg:text-sm text-black dark:text-white mt-1" required />
            </Field>
            <Field className="flex justify-center -mt-4 w-full lg:w-[500px]">
              <Button disabled={queryPending} type="submit" className="bg-highlight rounded-md py-1 font-bold cursor-pointer tracking-wider" variant={'destructive'}>Generar ticket</Button>
            </Field>
            <div className="min-h-[1.5rem]">
              <p className={`text-xs font-bold text-black dark:text-white transition-opacity duration-300 ${ticketMessage ? "opacity-100" : "opacity-0"}`}>
                {ticketMessage
                  ? `Generamos tu ticket para resolver tu inconveniente a la brevedad #${ticketMessage}`
                  : "‎"} {/* el carácter invisible evita colapsar el contenedor */}
              </p>
            </div>
          </FieldGroup>
        </form>
      </div>
    </>
  )
}

export default SupportForm