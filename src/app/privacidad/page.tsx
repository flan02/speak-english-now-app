import { Card, CardContent } from "@/components/ui/card"
import MaxWidthWrapper from "@/components/reutilizable/MaxWidthWrapper"
import { ArrowLeftCircle, LanguagesIcon } from "lucide-react"
import Link from "next/link"

export default function PrivacidadPage() {
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
          <h1 className="text-xl xl:text-2xl font-bold text-center mb-6">Política de Privacidad</h1>
          <p>
            En <strong>HablaInglesYa</strong>, valoramos y respetamos la privacidad de nuestros
            usuarios. Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos su
            información personal al utilizar nuestros servicios.
          </p>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">1. Información que recopilamos</h2>
            <p>
              Podemos recopilar datos personales como su nombre, dirección de correo electrónico y
              preferencias lingüísticas, así como información técnica sobre su dispositivo y sesión.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">2. Uso de la información</h2>
            <p>
              Los datos recopilados se utilizan únicamente para brindar y mejorar nuestros servicios,
              personalizar su experiencia, enviar notificaciones relevantes y garantizar la seguridad
              de la plataforma.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">3. Compartición de datos</h2>
            <p>
              No compartimos información personal con terceros, excepto cuando sea necesario para
              cumplir con obligaciones legales o integrar servicios externos como autenticación de
              Google u otros proveedores confiables.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">4. Seguridad de los datos</h2>
            <p>
              Implementamos medidas de seguridad adecuadas para proteger su información contra accesos
              no autorizados, pérdida o alteración. Sin embargo, ningún sistema es completamente seguro
              y no podemos garantizar una protección absoluta.
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

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">6. Cambios en esta política</h2>
            <p>
              Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento.
              Los cambios se publicarán en esta página junto con la fecha de actualización. En caso de alguna modificacion significativa,
              se lo notificaremos por correo electrónico y mediante un aviso destacado en nuestro sitio web.
            </p>
          </section>

          <p className="text-xs text-muted-foreground text-center py-4">
            Última actualización: {new Date().toLocaleDateString("es-AR")}
          </p>
        </CardContent>
      </Card>
    </MaxWidthWrapper>
  )
}
