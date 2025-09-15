import { auth } from "@/auth";
import { isSessionActive } from "@/lib/utils";
import { redirect } from "next/navigation";
import ScrollToTop from "@/components/reutilizable/ScrollToTop";
import Marquee from "@/components/reutilizable/Marquee";
import Section1 from "@/components/home/Section1";
import Section2 from "@/components/home/Section2";
import Section3 from "@/components/home/Section3";
import { marquee_banners } from "@/lib/types";
import BackgroundMultiDots from "@/components/reutilizable/BackgroundMultiDots";



export default async function Home() {
  const session = await auth()
  //console.log(session?.user)
  if (session?.user?.exp && isSessionActive(parseInt(session?.user.exp))) {
    redirect("/resumes")
  }


  return (
    <main className="relative flex flex-col items-center justify-center gap-6 py-4 text-center">

      <Marquee time={30} banners={marquee_banners} />
      <BackgroundMultiDots />
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


