import { reduccionesColoquiales } from "@/lib/types"

type Props = {}

const P = () => {
  return (
    <>
      {
        reduccionesColoquiales.map((item, index) => (
          <p key={index} className="w-[250px] ml-4 text-sm font-roboto">{item}</p>
        ))
      }
    </>
  )
}

export default P