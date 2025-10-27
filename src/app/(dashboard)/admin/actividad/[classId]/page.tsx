import { auth } from "@/auth"
import MaxWidthWrapper from "@/components/reutilizable/MaxWidthWrapper"

type URLParamsProps = {
  params: Promise<{
    classId: string
  }>
}

const ActividadPage = async ({ params }: URLParamsProps) => {
  const { classId } = await params
  const session = await auth()
  if (!session) {
    return <MaxWidthWrapper>
      <h1 className='text-3xl'>No tienes los permisos necesarios para acceder a esta ruta</h1>
    </MaxWidthWrapper>
  }
  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL!
  if (!isAdmin) {
    return <MaxWidthWrapper>
      <h1 className='text-3xl'>No tienes los permisos necesarios para acceder a esta ruta</h1>
    </MaxWidthWrapper>
  }
  return (
    <MaxWidthWrapper>
      {
        isAdmin &&
        <div>
          <h1 className="text-3xl font-bold mb-4">Administrar Actividad IA</h1>
          <p>class id: {classId}</p>
          <p>title</p>
          <p>content</p>
          <p>solved content</p>
          <p>description</p>
          <p>type: type of exam</p>
          <p>difficulty</p>
        </div>
      }
    </MaxWidthWrapper>
  )
}

export default ActividadPage