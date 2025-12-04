"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TUTORIAL_DATA } from "@/lib/types";



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
              <div className="aspect-video w-full rounded-md overflow-hidden border">
                <iframe
                  src={`https://www.youtube.com/embed/${tutorial.videoId}`}
                  title={tutorial.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
