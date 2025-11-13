import { Card, CardContent } from "@/components/ui/card"
import MaxWidthWrapper from "@/components/reutilizable/MaxWidthWrapper"
import Link from "next/link"
import { ArrowLeftCircle, LanguagesIcon } from "lucide-react"

export default function TosPage() {
  return (
    <MaxWidthWrapper className="py-6">
      <Card className="border border-card shadow-sm rounded-lg xl:py-10 xl:px-6">
        <div className="flex justify-between items-center mr-1 xl:mr-8 2xl:mr-8">
          <div className="w-full flex items-end pl-2 lg:pl-0 xl:pl-0 2xl:pl-0">
            <LanguagesIcon className="pr-2 text-purple-500/70 size-12 lg:size-16" />
            <h1 className="text-xl lg:text-4xl font-bold text-lime-950">HABLA</h1>
            <h1 className="text-xl lg:text-4xl font-bold bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">INGLES</h1>
            <h1 className="text-xl lg:text-4xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">YA</h1>
          </div>
          <Link href="/" className='underline mr-2 lg:mr-0'>
            <ArrowLeftCircle />
          </Link>
        </div>
        <CardContent className="space-y-6 p-4 font-roboto mt-0 lg:mt-4">
          <h1 className="text-xl xl:text-2xl font-bold text-center mb-6">Términos y Condiciones de Uso</h1>
          <p>
            Bienvenido/a a <strong>HablasInglesYa</strong>. Al acceder o utilizar esta aplicación,
            usted acepta los presentes <strong>Términos y Condiciones</strong>. Si no está de acuerdo
            con alguna parte de estos términos, le recomendamos no utilizar el servicio.
          </p>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">1. Uso del servicio</h2>
            <p>
              Esta plataforma tiene como finalidad ofrecer recursos interactivos para mejorar las
              habilidades de comunicación en inglés. El usuario se compromete a utilizar el servicio
              de manera responsable, sin realizar actividades que puedan afectar su funcionamiento o
              la experiencia de otros usuarios.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">2. Registro y cuenta</h2>
            <p>
              Al registrarse, el usuario se compromete a proporcionar información veraz y actualizada.
              Usted es responsable de mantener la confidencialidad de sus credenciales de acceso.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">3. Propiedad intelectual</h2>
            <p>
              Todo el contenido disponible en esta aplicación, incluidos textos, gráficos, logotipos
              y código fuente, es propiedad de <strong>HablasInglesYa</strong> o de sus
              licenciantes y se encuentra protegido por las leyes de propiedad intelectual vigentes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">4. Limitación de responsabilidad</h2>
            <p>
              <strong>HablasInglesYa</strong> no se hace responsable por daños directos o indirectos
              que resulten del uso o imposibilidad de uso de la aplicación, incluyendo pérdida de datos
              o interrupciones del servicio.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">5. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de actualizar estos términos en cualquier momento. Las
              modificaciones serán notificadas y publicadas en esta misma página.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">6. Contacto</h2>
            <div>
              <p>
                Si tiene dudas o sugerencias sobre estos términos, puede comunicarse a:
                <span className="text-blue-400 hover:underline"> +11-3057-7799</span>
              </p>
            </div>
          </section>

          <p className="text-xs text-muted-foreground text-center py-4">
            Última actualización: {new Date().toLocaleDateString("es-AR")}
          </p>
        </CardContent>
      </Card>
    </MaxWidthWrapper>
  )
}
