'use client'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Skeleton } from '../ui/skeleton'
import { NivelIngles } from '@prisma/client'
import { URL_ROUTES } from '@/services/api/routes'
import { useUserDataForm } from '@/hooks/useUserDataForm'


type Props = {}

const EditUserInfo = (props: Props) => {
  const {
    formUpdated,
    isLoading,
    isEditing,
    setIsEditing,
    handleSave,
    handleEdit,
  } = useUserDataForm();

  if (isLoading) {
    return (
      <div className='space-y-3'>
        <Skeleton className="h-5 w-[300px] rounded-md animate-pulse bg-gray-200 skeleton-bg-dark" />
        <Skeleton className="h-5 w-[300px] rounded-md animate-pulse bg-gray-200 skeleton-bg-dark" />
        <Skeleton className="h-5 w-[300px] rounded-md animate-pulse bg-gray-200 skeleton-bg-dark" />
        <Skeleton className="h-5 w-[300px] rounded-md animate-pulse bg-gray-200 skeleton-bg-dark mb-12 xl:mb-4 2xl:mb-4" />
        <div className='flex flex-col lg:flex-row lg:space-x-1'>
          <Skeleton className="h-9 w-full lg:w-[110px] lg:px-8 rounded-md animate-pulse bg-gray-200 skeleton-bg-dark" />
          <Skeleton className="h-9 w-full lg:w-[110px] lg:px-8 rounded-md animate-pulse bg-gray-200 skeleton-bg-dark mt-3 lg:mt-0" />
        </div>
        <div className='w-full flex justify-center'>
          <Skeleton className="h-9 w-full lg:w-[70px] lg:px-8 rounded-md animate-pulse bg-gray-200 skeleton-bg-dark" />
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSave} className='space-y-3'>
      <div className='flex space-x-2 items-end h-5'>
        <p className='font-roboto underline font-bold uppercase text-xs'>localidad:</p>
        {
          !isEditing.status ?
            <div className='!no-underline !lowercase text-xs font-roboto'>{isEditing.localidad}</div>
            :
            <input
              type="text" className='input-text !px-1 !text-xs !h-5 border border-gray-400 border-card rounded-md'
              placeholder='ingresa tu localidad'
              pattern='^(?!\s*$)[A-Za-zÀ-ÿ\s]{1,40}$'
              value={isEditing.localidad} onChange={(e) => setIsEditing({ ...isEditing, localidad: e.target.value })}
            />
        }
      </div>
      <div className='flex space-x-2 items-end h-5'>
        <p className='font-roboto underline font-bold uppercase text-xs'>nivel de ingles:</p>
        {
          !isEditing.status ?
            <div className='!no-underline !lowercase text-xs font-roboto mt-0.25'>{isEditing.nivel}</div>
            :
            <select className='text-xs font-roboto border border-gray-400 border-card rounded-md !p-1 dark:bg-black' value={isEditing.nivel} onChange={(e) => setIsEditing({ ...isEditing, nivel: (e.target.value as NivelIngles) })}>
              <option value="basico" >basico</option>
              <option value="intermedio">intermedio</option>
              <option value="avanzado">avanzado</option>
            </select>
        }
      </div>
      <div className='flex space-x-2 items-end h-5'>
        <p className='font-roboto underline font-bold uppercase text-xs mt-2'>telefono:</p>
        {
          !isEditing.status ?
            <div className='!no-underline !lowercase text-xs font-roboto mt-0.25'>{String(isEditing.telefono)}</div>
            :
            <input
              type="number" className='input-text !p-1 !text-xs !h-5 border border-gray-400 border-card rounded-md' placeholder='ingresa tu nro celular' value={Number(isEditing.telefono)} onChange={(e) => setIsEditing({ ...isEditing, telefono: Number(e.target.value) })}
            />
        }
      </div>
      <div className='flex space-x-2 items-end mb-12 xl:mb-4 2xl:mb-4 h-5'>
        <p className='font-roboto underline font-bold uppercase text-xs mt-2'>¿Recibir boletin?</p>
        {
          !isEditing.status ?
            <div className='!no-underline !lowercase text-xs font-roboto mt-0.25'>{isEditing.newsletter}</div>
            :
            <input
              type="checkbox" className='input-text !p-1 !text-xs !h-5 border border-gray-400 border-card rounded-md' checked={isEditing.newsletter === 'si'} onChange={(e) => setIsEditing({ ...isEditing, newsletter: e.target.checked ? 'si' : 'no' })}
            />
        }
      </div>
      <Button asChild variant='default' className='w-full lg:w-auto bg-highlight text-xs mr-1'>
        <Link href={URL_ROUTES.FACTURACION}>
          Facturacion
        </Link>
      </Button>
      <Button asChild variant='default' className='w-full lg:w-auto text-xs mt-2 lg:mt-0 bg-highlight'>
        <Link href={URL_ROUTES.SOPORTE}>
          Soporte y Ayuda
        </Link>
      </Button>
      <div className='w-full text-center space-x-2'>
        <Button onClick={handleEdit} disabled={isEditing.status} variant='destructive' className='w-full lg:w-auto text-xs bg-gray-400 hover:bg-gray-400/80'>
          editar
        </Button>
        {
          isEditing.status &&
          <Button type="submit" className='w-full lg:w-auto btn-green text-xs bg-green-600 hover:bg-green-600/80 mt-1 text-white'>Guardar</Button>
        }

      </div>
      <div className='text-center h-5'>
        {
          formUpdated && <span className='font-roboto text-xs font-black'>configuracion actualizada correctamente!</span>
        }
      </div>
    </form>
  )
}

export default EditUserInfo

