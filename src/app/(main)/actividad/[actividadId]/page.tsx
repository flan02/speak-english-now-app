import { db } from "@/db"
import { notFound } from "next/navigation"


interface Props {
  params: {
    actividadId: string
  }
}

const ActividadPage = async ({ params }: Props) => {
  const resolvedParams = await params;

  const task = await db.task.findUnique({
    where: {
      id: resolvedParams.actividadId
    }
  })

  if (!task) return notFound()

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold text-center">{task.title}</h1>
      <p className="text-sm text-gray-600 text-center">{task.description}</p>
      <div className="flex justify-center mt-6">
        <a
          href={`/actividad/${task.id}/resolver`}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg text-sm"
        >
          Comenzar actividad
        </a>
      </div>
    </div>
  );
}

export default ActividadPage