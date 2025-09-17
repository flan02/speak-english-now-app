import Image, { StaticImageData } from "next/image";

export function ModalidadCard({ image, paragraph, order }: { image: StaticImageData, paragraph: string[], order: boolean }) {
  return (<article className={`flex space-x-8 ${order ? 'justify-end' : ''}`}>
    <div className={`space-y-8 w-1/2 mx-auto ${order ? 'order-1' : 'order-0'}`}>
      {
        paragraph.map((line, index) => (
          <h3 key={index} className={`font-roboto text-sm uppercase text-left ${order ? 'pl-20' : '-ml-8 pr-12'}`}>{line}</h3>
        ))
      }
    </div>
    <Image src={image} alt="Aula Virtual" className={`w-[45%] h-[300px] rounded-md`} />
  </article>)
}