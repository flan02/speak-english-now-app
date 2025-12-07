"use client";

import ProVideoPlayer from "../reutilizable/pro-video-player";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const TUTORIAL_DATA = [
  {
    id: "1",
    title: "Cómo pagar tu clase",
    description: "Te explicamos como realizar el pago de tus clases en nuestra plataforma. Aceptamos tarjetas de crédito, débito y Mercado Pago para tu comodidad.",
    src: "https://res.cloudinary.com/dnpw6iBEG/video/upload/v1733432195/speak-english-now/payment_tutorial_video.mp4",
    poster: "https://res.cloudinary.com/dhbig9jt8/image/upload/v1763783894/opengraph-image-hablainglesya_fiuows.png",
  },
  {
    id: "2",
    title: "Compartir el codigo de clase",
    description: "Aprende cómo gestionar una clase grupal y enviar el código de clase a tus amigos para que se unan.",
    src: "https://res.cloudinary.com/dnpw6iBEG/video/upload/v1733432195/speak-english-now/referral_tutorial_video.mp4",
    poster: "https://res.cloudinary.com/dhbig9jt8/image/upload/v1763783894/opengraph-image-hablainglesya_fiuows.png",
  },
  {
    id: "3",
    title: "Reservar un horario",
    description: "Descubre lo fácil que es reservar un horario para tu próxima clase a través de nuestro calendario interactivo.",
    src: "https://res.cloudinary.com/dnpw6iBEG/video/upload/v1733432195/speak-english-now/booking_tutorial_video.mp4",
    poster: "https://res.cloudinary.com/dhbig9jt8/image/upload/v1763783894/opengraph-image-hablainglesya_fiuows.png",
  },
];


export default function TutorialsList() {
  return (
    // Quité la altura fija (h-[700px]) y puse min-h para evitar scrollbars feos si el contenido crece
    <div className="max-w-3xl mx-auto rounded-lg min-h-[500px] p-0 lg:p-6">
      <Accordion type="single" collapsible className="w-full">
        {
          TUTORIAL_DATA.map((tutorial) => (
            <AccordionItem value={tutorial.id} key={tutorial.id}>
              <AccordionTrigger className="text-sm md:text-lg font-medium hover:no-underline">{tutorial.title}</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4 pt-2">
                  <p className="text-muted-foreground text-xs lg:text-sm pl-1 border-l-2 border-primary/20">
                    {tutorial.description}
                  </p>
                  <div className="rounded-xl overflow-hidden border border-border bg-muted">
                    <ProVideoPlayer
                      src={tutorial.src}
                      poster={tutorial.poster}
                      loop
                      muted // Muted es buena práctica para autoplay, pero si el usuario le da play manual, querrá sonido.
                    // Si quieres sonido al dar play, quita la prop 'muted' aquí y déjala false por defecto en el componente.
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))
        }
      </Accordion>
    </div>
  );
}


