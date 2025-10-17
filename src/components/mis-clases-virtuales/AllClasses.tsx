import { getAllClasses } from "@/app/(main)/inicio/mis-clases-virtuales/actions"
import { Session } from "next-auth"
import EachClass from "./EachClass"
import { Card } from "../ui/card"



type SessionProps = {
  session: Session
}

const AllClasses: React.FC<SessionProps> = async ({ session }) => {

  const all_classes = await getAllClasses(session.user.id)



  return (
    <>
      <div className="mb-2">
        <Card className='flex font-bold w-full border border-card rounded-none p-4 space-y-1 bg-black dark:bg-white text-white dark:text-black'>
          <p className="w-[80px]">Dia</p>
          <p className="w-[120px]">Horario</p>
          <p className="w-[80px]">Tipo</p>
          <p className="w-[70px]">Rol</p>
          <p className="w-[80px]">Estado</p>
          <p className="w-[90px]">Tarea IA</p>
          <p className="w-[90px]">Codigo</p>
        </Card>
      </div>
      <div className="space-y-1">
        {
          all_classes.map((classItem, index) => (
            <EachClass key={index} classItem={classItem} index={index} />
          ))
        }
      </div>
    </>
  )
}

export default AllClasses