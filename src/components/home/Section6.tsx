'use client'
import MaxWidthWrapper from '../reutilizable/MaxWidthWrapper'
import { MetodoDePagoBadge } from '../reutilizable/MetodoDePagoBadge'
import { metodos_pago } from '@/lib/types'
import { Field, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { subscribeUser, supportUser } from '@/app/(main)/inicio/actions'
import { useActionForm } from '@/hooks/useActionForm'
import { Textarea } from '../ui/textarea'

type Props = {}

const Section6 = (props: Props) => {

  const { formAction: subscribe, message: localMessage, pending: subscribePending } = useActionForm(subscribeUser)
  const { formAction: query, message: queryMessage, pending: queryPending } = useActionForm(supportUser)


  return (
    <MaxWidthWrapper className='lg:space-y-16'>
      <h2 className="mb-0 text-3xl pt-16 pb-8 lg:text-5xl font-bold lg:mb-16 lg:py-0 text-center tracking-wider">Información General</h2>
      <h3 className='text-xs lg:text-base text-left px-1 font-roboto'>
        Una vez registrado en nuestra plataforma podras acceder a todas las funcionalides y beneficios. Recuerda que el registro es gratuito
        y no pagaras ninguna suscripcion mensual, solamente abonas en el momento que realices la reserva de una clase.
      </h3>
      <article className='text-left space-y-6 -mt-6'>
        <div className='flex space-x-2 h-min'>
          <form action={subscribe} className='w-full lg:w-[500px]'>
            <FieldGroup className='text-black dark:text-white'>
              <Field className='w-full lg:w-[500px]'>
                <FieldLabel className='font-bold'>Subscrite a nuestro newsletter: </FieldLabel>
                <Input name='email' type="email" placeholder='Tu email' className='border rounded-md text-xs lg:text-sm pl-2 text-black dark:text-white' required />
              </Field>
              <Field className='-mt-4 w-full lg:w-[500px]'>
                <Button disabled={subscribePending} type="submit" className='bg-highlight font-bold cursor-pointer tracking-wider' variant={'destructive'}>{subscribePending ? "Enviando..." : "Suscribirme"}</Button>
              </Field>
              <div className="min-h-[1.5rem]">
                <p className={`text-xs font-bold text-black dark:text-white transition-opacity duration-300 ${localMessage ? "opacity-100" : "opacity-0"}`}>
                  {localMessage || "‎"} {/* el carácter invisible evita colapsar el contenedor */}
                </p>
              </div>
            </FieldGroup>
          </form>
        </div>
        <p className='font-bold text-xs lg:text-sm font-roboto'>Si tenes consultas sobre nuestro servicio, o necesitas un horario en particular no dudes en contactarnos abajo en el formulario o vía whatsapp +11-3057-7799</p>
        <div className='flex flex-col mt-12 lg:mt-4 space-y-4 font-roboto w-full lg:w-full'>
          <form action={query} className="flex flex-col gap-4 text-sm">
            <FieldGroup>

              <Field className='w-full lg:w-[500px]'>
                <FieldLabel className="font-bold ">Escribemos te responderemos a la brevedad:</FieldLabel>
                <Input name="contacto" type="text" placeholder="Email/Teléfono" className="text-xs lg:text-sm text-black dark:text-white" required />
              </Field>
              <Field className='w-full lg:w-[500px]'>
                <FieldLabel className="font-bold">Mensaje:</FieldLabel>
                <Textarea name="textarea" rows={4} placeholder="Escribí tu mensaje..." className="text-xs lg:text-sm text-black dark:text-white mt-1" required />
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
      </article>
      <br />
      <MetodoDePagoBadge title={metodos_pago} color="metodopago text-[9px] lg:text-xs text-yellow-700 bg-yellow-100 border-2 border-yellow-300 rounded-lg" margin="-ml-2" />
    </MaxWidthWrapper>
  )
}

export default Section6


