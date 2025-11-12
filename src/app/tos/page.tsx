import { Card, CardContent } from "@/components/ui/card"
import MaxWidthWrapper from "@/components/reutilizable/MaxWidthWrapper"

export default function TosPage() {
  return (
    <MaxWidthWrapper className="py-6">
      <Card className="border border-gray-300 shadow-sm rounded-lg">
        <CardContent className="space-y-6 p-4 font-roboto">
          <h1 className="text-3xl font-bold text-center mb-6">Términos y Condiciones de Uso</h1>

          <p>
            Bienvenido/a a <strong>HablasInglesYa</strong>. Al acceder o utilizar esta aplicación,
            usted acepta los presentes <strong>Términos y Condiciones</strong>. Si no está de acuerdo
            con alguna parte de estos términos, le recomendamos no utilizar el servicio.
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">1. Uso del servicio</h2>
            <p>
              Esta plataforma tiene como finalidad ofrecer recursos interactivos para mejorar las
              habilidades de comunicación en inglés. El usuario se compromete a utilizar el servicio
              de manera responsable, sin realizar actividades que puedan afectar su funcionamiento o
              la experiencia de otros usuarios.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">2. Registro y cuenta</h2>
            <p>
              Al registrarse, el usuario se compromete a proporcionar información veraz y actualizada.
              Usted es responsable de mantener la confidencialidad de sus credenciales de acceso.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">3. Propiedad intelectual</h2>
            <p>
              Todo el contenido disponible en esta aplicación, incluidos textos, gráficos, logotipos
              y código fuente, es propiedad de <strong>HablasInglesYa</strong> o de sus
              licenciantes y se encuentra protegido por las leyes de propiedad intelectual vigentes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">4. Limitación de responsabilidad</h2>
            <p>
              <strong>HablasInglesYa</strong> no se hace responsable por daños directos o indirectos
              que resulten del uso o imposibilidad de uso de la aplicación, incluyendo pérdida de datos
              o interrupciones del servicio.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">5. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de actualizar estos términos en cualquier momento. Las
              modificaciones serán notificadas y publicadas en esta misma página.
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

          <p className="text-sm text-muted-foreground text-center">
            Última actualización: {new Date().toLocaleDateString("es-AR")}
          </p>
        </CardContent>
      </Card>
    </MaxWidthWrapper>
  )
}
