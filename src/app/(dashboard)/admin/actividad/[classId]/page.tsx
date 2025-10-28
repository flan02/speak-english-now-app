import { auth } from "@/auth"
import MaxWidthWrapper from "@/components/reutilizable/MaxWidthWrapper"
import { getVirtualClass, uploadExam } from "./actions"
import { VirtualClass } from "@/lib/types"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet, FieldTitle } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import LogoHablaInglesYa from "@/components/reutilizable/LogoHablaInglesYa"

type URLParamsProps = {
  params: Promise<{
    classId: string
  }>
}

const ActividadPage = async ({ params }: URLParamsProps) => {
  const { classId } = await params
  const virtualClass: VirtualClass = await getVirtualClass(classId) as VirtualClass

  const session = await auth()

  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL!
  if (!isAdmin || !session) {
    return <MaxWidthWrapper>
      <h1 className='text-3xl'>No tienes los permisos necesarios para acceder a esta ruta</h1>
    </MaxWidthWrapper>
  }



  return (
    <MaxWidthWrapper>
      {
        isAdmin &&
        <section className="space-y-12">
          <LogoHablaInglesYa />
          <pre className="absolute top-0 right-0 text-xs">
            {JSON.stringify(virtualClass, null, 2)}
          </pre>
          <div className="w-full max-w-md mx-auto">
            <form action={uploadExam}>
              <FieldGroup className="font-roboto font-bold">
                <FieldSet>
                  <FieldTitle className="text-xl font-bold">Crear nuevo examen con Inteligencia Artificial</FieldTitle>
                  <FieldDescription>
                    Se enviaran dos versiones del examen: una sin resolver y otra resuelta
                  </FieldDescription>
                  <FieldGroup>
                    <Field>
                      <FieldLabel>
                        Id de la clase virtual
                      </FieldLabel>
                      <Input
                        name="classId"
                        defaultValue={virtualClass.id}
                        disabled
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel>
                        Titulo del examen
                      </FieldLabel>
                      <Input
                        name="title"
                        placeholder="Ingresa el titulo..."
                        className="capitalize"
                        required
                      />
                    </Field>

                    <Field>
                      <FieldLabel>
                        Describe el examen
                      </FieldLabel>
                      <Textarea
                        name="description"
                        className="resize-none"
                        rows={6}
                        placeholder="Ingresa las consignas de los ejercicios..." />
                    </Field>

                    <Field>
                      <FieldLabel>
                        Dificultad
                      </FieldLabel>
                      <Select defaultValue="" name="difficulty">
                        <SelectTrigger>
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-black">
                          <SelectItem value="easy">inicial</SelectItem>
                          <SelectItem value="medium">intermedio</SelectItem>
                          <SelectItem value="hard">avanzado</SelectItem>

                        </SelectContent>
                      </Select>
                    </Field>

                    <Field >
                      <FieldLabel>
                        Modelo de examen
                      </FieldLabel>
                      <Textarea
                        name="exam-content"
                        rows={12}
                        className="resize-none text-xs"
                        placeholder="Pega aqui el examen en formato Markdown..." />
                    </Field>

                    <Field>
                      <FieldLabel>
                        Resolucion del examen
                      </FieldLabel>
                      <Textarea
                        name="exam-response"
                        rows={12}
                        className="resize-none"
                        placeholder="Pega aqui el examen en formato Markdown..." />
                    </Field>
                  </FieldGroup>
                </FieldSet>
                <FieldSeparator />
                <Field orientation="horizontal">
                  <Button variant="default" type="submit" className="bg-black text-white w-full text-lg tracking-wide hover:bg-black/85">Enviar</Button>
                </Field>
              </FieldGroup>
            </form>
          </div>
        </section>
      }
      <div className="mx-auto text-center">
        <Button variant="default" className="bg-black text-white text-xs" asChild>
          <Link href="/admin">Back</Link>
        </Button>
      </div>
    </MaxWidthWrapper>
  )
}

export default ActividadPage