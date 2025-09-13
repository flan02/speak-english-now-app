import { auth } from "@/auth";
import { isSessionActive } from "@/lib/utils";
import { redirect } from "next/navigation";
import Section2 from "@/components/home/Section2";
import Section3 from "@/components/home/Section3";
import ScrollToTop from "@/components/reutilizable/ScrollToTop";
import Marquee from "@/components/reutilizable/Marquee";
import Section1 from "@/components/home/Section1";



export default async function Home() {
  const session = await auth()
  //console.log(session?.user)
  if (session?.user?.exp && isSessionActive(parseInt(session?.user.exp))) {
    redirect("/resumes")
  }

  const marquee_banners = ["🌟 El mejor precio/calidad garantizado  —", "📆 ¡Agenda tu clase en nuestro calendariograma!  —", "📞 Hablanos por whatsapp o nuestro website para mas info  —", "✉️ Suscribite a nuestro boletín para novedades!!!"]
  return (
    <main className="relative flex flex-col items-center justify-center gap-6 py-4 text-center">

      <Marquee time={20} banners={marquee_banners} />
      <div className="absolute inset-0">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] bg-thousand_points"></div>
      </div>
      <Section1 />

      <Section2 />
      <Section3 />


      <section>SECTION 4: Calendario de clases</section>
      <section>SECTION 5: Formas de pago y Reservas con transferencias 50% por adelantado y 50% al iniciar la clase</section>
      <section>SECTION 6: Sobre mi, links a mis redes, sitio web</section>
      <section>SECTION 7: consultas, suscribirse, solicitar ticket descuento</section>
      <ScrollToTop />


    </main>
  );
}


