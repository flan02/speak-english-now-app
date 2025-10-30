
import { Session } from "next-auth"
import EachClass from "./EachClass"
import { Card } from "../ui/card"
import { getAllClasses } from "@/app/(main)/inicio/mis-clases-virtuales/actions"



type SessionProps = {
  session: Session
}

const AllClasses: React.FC<SessionProps> = async ({ session }) => {

  const all_classes = await getAllClasses(session.user.id)

  return (
    <>
      <div className="mb-2">
        <Card className='flex font-bold w-full border border-card rounded-none p-4 space-y-1 bg-black dark:bg-white text-white dark:text-black'>
          <p className="w-[80px] text-center">Dia</p>
          <p className="w-[110px] text-center">Horario</p>
          <p className="w-[80px] text-center">Tipo</p>
          <p className="w-[65px] text-center">Rol</p>
          <p className="w-[75px] text-center">Estado</p>
          <p className="w-[105px] text-center">Tarea IA</p>
          <p className="w-[90px] text-center">Codigo</p>
        </Card>
      </div>
      <div className="space-y-1">
        {
          all_classes?.map((classItem, index) => (
            <EachClass key={index} classItem={classItem.class!} index={index} />
          ))
        }
      </div>
    </>
  )
}

export default AllClasses