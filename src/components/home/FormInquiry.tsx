'use client'
import { Field, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { useActionForm } from '@/hooks/useActionForm'
import { supportUser } from '@/app/(main)/inicio/actions'

type Props = {}

const FormInquiry = (props: Props) => {
  const { formAction: query, message: queryMessage, pending: queryPending } = useActionForm(supportUser)
  return (
    <>
      <p className='font-bold text-xs lg:text-sm font-roboto'>Si tenes consultas sobre nuestro servicio, o necesitas un horario en particular no dudes en contactarnos abajo en el formulario o vía whatsapp +11-3057-7799</p>
      <div className='flex flex-col items-center space-y-4 font-roboto'>
        <form action={query} className="flex flex-col gap-4 text-sm items-center justify-center w-full lg:w-[500px]">
          <FieldGroup className=''>
            <Field className='w-full lg:w-[500px]'>
              <FieldLabel className="font-bold font-roboto text-xs lg:text-sm text-left">Escribemos nuestro asistente IA se pondra en contacto contigo a la brevedad:</FieldLabel>
              <Input name="contacto" type="text" placeholder="Email/Teléfono" className="text-xs lg:text-sm text-black dark:text-white" required />
            </Field>
            <Field className='w-full lg:w-[500px]'>
              <FieldLabel className="font-bold font-roboto text-xs lg:text-sm">Consulta:</FieldLabel>
              <Textarea name="textarea" rows={4} placeholder="Escribí tu mensaje aqui..." className="text-xs lg:text-sm text-black dark:text-white mt-1" required />
            </Field>
            <Field className="flex justify-center -mt-4 w-full lg:w-[500px]">
              <Button disabled={queryPending} type="submit" className="bg-highlight rounded-md py-1 font-bold cursor-pointer tracking-wider" variant={'destructive'}>Enviar</Button>
            </Field>
            <div className="min-h-[1.5rem]">
              <p className={`text-xs font-bold text-black dark:text-white transition-opacity duration-300 ${queryMessage ? "opacity-100" : "opacity-0"}`}>
                {queryMessage || "‎"} {/* el carácter invisible evita colapsar el contenedor */}
              </p>
            </div>
          </FieldGroup>
        </form>
      </div>
    </>
  )
}

export default FormInquiry