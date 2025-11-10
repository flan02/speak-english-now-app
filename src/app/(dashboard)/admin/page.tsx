
import { auth } from '@/auth'
import MaxWidthWrapper from '@/components/reutilizable/MaxWidthWrapper'
import { Card } from '@/components/ui/card'
import React from 'react'
import AllClasses from '@/components/admin/AllClasses'
import LogoHablaInglesYa from '@/components/reutilizable/LogoHablaInglesYa'

// type SearchParamProps = { [key: string]: string | undefined }
type SearchParamProps = Promise<Record<string, string | undefined>>

interface AdminPageProps {
  searchParams?: SearchParamProps
  // searchParams?: SearchParamProps
  // searchParams?: Promise<Record<string, string | undefined>>
}


const AdminPage = async ({ searchParams }: AdminPageProps) => {

  const session = await auth()

  const serverParams = (await searchParams) ?? {}

  // if (searchParams?.status == undefined) serverParams = { status: 'all' }
  const isAdmin = session?.user.email === process.env.ADMIN_EMAIL!
  if (!isAdmin) {
    return <MaxWidthWrapper>
      <h1 className='text-3xl'>No tienes los permisos necesarios para acceder a esta ruta</h1>
    </MaxWidthWrapper>
  }

  return (
    <MaxWidthWrapper className='space-y-8'>
      <LogoHablaInglesYa />
      <div className='flex items-end space-x-2'>
        <h2 className='font-roboto font-bold text-xl'>PANEL DE ADMIN - </h2>

        <p className='text-sm mb-0.5'>Bienvenido, {session?.user.name}</p>
      </div>
      <div className='flex space-x-2 items-center'>
        <p className='text-sm font-roboto'>Filtrar por:</p>
        <a href="?status=scheduled" className={`${serverParams?.status === "scheduled" ? "border-4 border-black" : ""} bg-gray-600 text-white hover:bg-gray-500 text-xs py-1.5 px-3 font-roboto rounded-md`}>Reservadas</a>
        <a href="?status=completed" className={`${serverParams?.status === "completed" ? "border-4 border-black" : ""} bg-gray-600 text-white hover:bg-gray-500 text-xs py-1.5 px-3 font-roboto rounded-md`}>Completadas</a>
        <a href="/admin" className={`${serverParams?.status === undefined ? "border-4 border-black" : ""} bg-gray-600 text-white hover:bg-gray-500 text-xs py-1.5 px-3 font-roboto rounded-md`} >Todas</a>
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
            <p className="w-[105px] text-center">Meeting</p>
            <p className="w-[105px] text-center">Tarea IA</p>
          </Card>
        </div>
        {
          session?.user?.email === process.env.ADMIN_EMAIL!
            ? <AllClasses session={session} filter={serverParams?.status!} />
            : <div>No tienes acceso a esta pagina</div>
        }
      </Card>
    </MaxWidthWrapper>
  )
}

export default AdminPage