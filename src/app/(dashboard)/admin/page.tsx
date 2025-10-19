
import { auth } from '@/auth'
import MaxWidthWrapper from '@/components/reutilizable/MaxWidthWrapper'
import { Card } from '@/components/ui/card'
import { LanguagesIcon } from 'lucide-react'
import React from 'react'
import AllClasses from '@/components/admin/AllClasses'


type Props = {}

const AdminPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined }
}) => {
  const session = await auth()

  let serverParams = await searchParams

  // if (searchParams?.status == undefined) serverParams = { status: 'all' }

  //console.log("searchParams status", serverParams?.status);

  if (session?.user.email != "chanivetdan1988@gmail.com") {
    return <div>No tienes acceso a esta pagina</div>
  }

  return (
    <MaxWidthWrapper className='space-y-8'>
      <div className="flex items-end space-x-4">
        <div className="w-full flex items-end">
          <LanguagesIcon className="pr-2 text-purple-500/70 size-20" />
          <h1 className="text-3xl lg:text-5xl font-bold text-lime-950">HABLA</h1>
          <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">INGLES</h1>
          <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">YA</h1>
        </div>
      </div>
      <div className='flex items-end space-x-2'>
        <h2 className='font-roboto font-bold text-xl'>PANEL DE ADMIN - </h2>

        <p className='text-sm mb-0.5'>Bienvenido, {session?.user.name}</p>
      </div>
      <div className='flex space-x-2 items-center'>
        <p className='text-sm font-roboto'>Filtrar por:</p>
        <a href="?status=scheduled" className='bg-gray-600 hover:bg-gray-500 text-xs py-1.5 px-3 font-roboto rounded-md' >Reservadas</a>
        <a href="?status=completed" className='bg-gray-600 hover:bg-gray-500 text-xs py-1.5 px-3 font-roboto rounded-md' >Completadas</a>
        <a href="/admin" className='bg-gray-600 hover:bg-gray-500 text-xs py-1.5 px-3 font-roboto rounded-md' >Todas</a>
      </div>
      <Card className='border border-card'>
        <div className="mb-2">
          <Card className='flex font-bold w-full border border-card rounded-none p-4 space-y-1 bg-black dark:bg-white text-white dark:text-black'>
            <p className="w-[80px] text-center">Dia</p>
            <p className="w-[110px] text-center">Horario</p>
            <p className="w-[80px] text-center">Tipo</p>
            <p className="w-[65px] text-center">Rol</p>
            <p className="w-[90px] text-center">Estado</p>
            <p className="w-[90px] text-center">Codigo</p>
            <p className="w-[105px] text-center"></p>
            <p className="w-[105px] text-center">Tarea IA</p>
          </Card>
        </div>
        {
          session?.user?.email === "chanivetdan1988@gmail.com"
            ? <AllClasses session={session} filter={serverParams?.status!} />
            : <div>No tienes acceso a esta pagina</div>
        }
      </Card>
    </MaxWidthWrapper>
  )
}

export default AdminPage