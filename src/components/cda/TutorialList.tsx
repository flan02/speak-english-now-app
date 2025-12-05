"use client";

import ProVideoPlayer from "../reutilizable/pro-video-player";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TUTORIAL_DATA = [
  {
    id: "1",
    title: "Cómo pagar tu clase",
    description: "Te explicamos las formas de pago disponibles en nuestra plataforma. Aceptamos tarjetas de crédito, débito y Mercado Pago para tu comodidad.",
    src: "https://res.cloudinary.com/dnpw6iBEG/video/upload/v1733432195/speak-english-now/payment_tutorial_video.mp4",
    poster: "https://res.cloudinary.com/dnpw6iBEG/image/upload/v1733432194/speak-english-now/payment_tutorial_poster.jpg",
  },
  {
    id: "2",
    title: "Compartir el codigo de clase",
    description: "Aprende cómo funciona nuestro sistema de referidos y obtén beneficios por cada amigo que se una a nuestra comunidad de estudiantes.",
    src: "https://res.cloudinary.com/dnpw6iBEG/video/upload/v1733432195/speak-english-now/referral_tutorial_video.mp4",
    poster: "https://res.cloudinary.com/dnpw6iBEG/image/upload/v1733432194/speak-english-now/referral_tutorial_poster.jpg",
  },
  {
    id: "3",
    title: "Reservar un horario",
    description: "Descubre lo fácil que es reservar un horario para tu próxima clase a través de nuestro calendario interactivo.",
    src: "https://res.cloudinary.com/dnpw6iBEG/video/upload/v1733432195/speak-english-now/booking_tutorial_video.mp4",
    poster: "https://res.cloudinary.com/dnpw6iBEG/image/upload/v1733432194/speak-english-now/booking_tutorial_poster.jpg",
  },
];



export default function TutorialsList() {
  return (
    <div className="max-w-3xl mx-auto rounded-lg h-[700px] p-6">
      <Accordion type="single" collapsible className="w-full">
        {TUTORIAL_DATA.map((tutorial) => (
          <AccordionItem value={tutorial.id} key={tutorial.id}>
            <AccordionTrigger className="text-sm font-roboto">
              {tutorial.title}
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground mb-4 text-xs pl-2">
                {tutorial.description}
              </p>
              <ProVideoPlayer
                src={tutorial.src}
                poster={tutorial.poster}
                loop
                muted
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
