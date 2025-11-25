'use client'
import { Field, FieldGroup, FieldLabel } from '../ui/field'
import { subscribeUser } from '@/app/(main)/inicio/actions'
import { useActionForm } from '@/hooks/useActionForm'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
type Props = {}

const FormNewsletter = (props: Props) => {
  const { formAction: subscribe, message: localMessage, pending: subscribePending } = useActionForm(subscribeUser)
  return (
    <div className='flex flex-col items-center space-x-2 h-min'>
      <form action={subscribe} className='w-full lg:w-[500px]'>
        <FieldGroup className='text-black dark:text-white'>
          <Field className='w-full lg:w-[500px]'>
            <FieldLabel className='font-bold text-xs lg:text-sm font-roboto text-left'>Subscrite a nuestro newsletter para recibir las ultimas novedades: </FieldLabel>
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
  )
}

export default FormNewsletter