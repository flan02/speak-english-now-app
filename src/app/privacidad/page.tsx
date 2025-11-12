import { Card, CardContent } from "@/components/ui/card"
import MaxWidthWrapper from "@/components/reutilizable/MaxWidthWrapper"

export default function PrivacidadPage() {
  return (
    <MaxWidthWrapper className="py-6">
      <Card className="border border-gray-300 shadow-sm rounded-2xl">
        <CardContent className="space-y-6 p-4 font-roboto">
          <h1 className="text-3xl font-bold text-center mb-6">Política de Privacidad</h1>
          <p>
            En <strong>HablaInglesYa</strong>, valoramos y respetamos la privacidad de nuestros
            usuarios. Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos su
            información personal al utilizar nuestros servicios.
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">1. Información que recopilamos</h2>
            <p>
              Podemos recopilar datos personales como su nombre, dirección de correo electrónico y
              preferencias lingüísticas, así como información técnica sobre su dispositivo y sesión.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">2. Uso de la información</h2>
            <p>
              Los datos recopilados se utilizan únicamente para brindar y mejorar nuestros servicios,
              personalizar su experiencia, enviar notificaciones relevantes y garantizar la seguridad
              de la plataforma.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">3. Compartición de datos</h2>
            <p>
              No compartimos información personal con terceros, excepto cuando sea necesario para
              cumplir con obligaciones legales o integrar servicios externos como autenticación de
              Google u otros proveedores confiables.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">4. Seguridad de los datos</h2>
            <p>
              Implementamos medidas de seguridad adecuadas para proteger su información contra accesos
              no autorizados, pérdida o alteración. Sin embargo, ningún sistema es completamente seguro
              y no podemos garantizar una protección absoluta.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">6. Contacto</h2>
            <div>
              <p>
                Si tiene dudas o sugerencias sobre estos términos, puede comunicarse a:
              </p>
              <span className="text-blue-600 hover:underline"> +11-3057-7799</span>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">6. Cambios en esta política</h2>
            <p>
              Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento.
              Los cambios se publicarán en esta página junto con la fecha de actualización.
            </p>
          </section>

          <p className="text-sm text-muted-foreground text-center">
            Última actualización: {new Date().toLocaleDateString("es-AR")}
          </p>
        </CardContent>
      </Card>
    </MaxWidthWrapper>
  )
}
