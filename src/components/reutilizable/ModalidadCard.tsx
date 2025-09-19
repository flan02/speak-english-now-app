import Image, { StaticImageData } from "next/image";

export function ModalidadCard({ image, paragraph, order }: { image: StaticImageData, paragraph: string[], order: boolean }) {
  return (<article className={`flex flex-col lg:flex lg:flex-row space-y-8 lg:space-x-8 ${order ? 'justify-end' : ''}`}>
    <div className={`space-y-8 min-w-[330px] lg:w-1/2 lg:mx-auto ${order ? 'lg:order-1' : 'order-0'}`}>
      {
        paragraph.map((line, index) => (
          <h3 key={index} className={`font-roboto text-sm lg:text-sm lowercase lg:uppercase text-left ${order ? 'lg:pl-20' : 'lg:-ml-8 lg:pr-12'}`}>{line}</h3>
        ))
      }
    </div>
    <Image src={image} alt="Aula Virtual" className={`lg:w-[45%] lg:h-[280px] rounded-md lg:object-fill`} />
  </article>)
}