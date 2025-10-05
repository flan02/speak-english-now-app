'use client'
import React, { useEffect } from 'react'
import ToggleClient from '../reutilizable/ToggleClient'
import { Button } from '../ui/button'
import Link from 'next/link'
import { KY, Method } from '@/services/api'
import { NivelIngles } from '@prisma/client'
import { Skeleton } from '../ui/skeleton'

type Props = {}

interface formUserData {
  status: boolean
  localidad: string
  nivel: NivelIngles | ''
  telefono: number | null
  newsletter: string
}

const EditUserInfo = (props: Props) => {
  const [formUpdated, setFormUpdated] = React.useState(false)

  const [isEditing, setIsEditing] = React.useState<formUserData>({
    status: false,
    localidad: '',
    nivel: '',
    telefono: null,
    newsletter: ''
  })

  const handleSaveBtn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = {
      localidad: isEditing.localidad,
      nivel: isEditing.nivel,
      telefono: Number(isEditing.telefono),
      newsletter: isEditing.newsletter
    }

    setIsEditing({ ...isEditing, status: false })

    setFormUpdated(true)
    setTimeout(() => {
      setFormUpdated(false)
    }, 3000);
    try {
      const res = await KY(Method.POST, '/api/user-data', { json: data });
      console.log('response after send user data:', res);
    } catch (error) {
      console.error(error);
    }
  }

  const handleEditButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsEditing({ ...isEditing, status: true })
  }


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await KY(Method.GET, 'http://localhost:3000/api/user-data');
        console.log('user data fetched:', res);
        if (res) {
          setIsEditing({
            ...isEditing,
            localidad: res.localidad || '',
            nivel: res.nivel || '',
            telefono: res.telefono || null,
            newsletter: res.newsletter || ''
          })
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <form onSubmit={handleSaveBtn} className='space-y-3'>
      <div className='flex space-x-2 items-end'>
        <p className='font-roboto underline font-bold uppercase text-xs'>localidad:</p>
        {
          !isEditing.status ?
            <div className='!no-underline !lowercase text-xs font-roboto'>{isEditing.localidad || <Skeleton className="h-4 w-[80px] rounded-md animate-pulse bg-gray-200 skeleton-bg-dark" />}</div>
            :
            <input
              type="text" className='input-text !px-1 !text-xs !h-5 border border-gray-400 border-card rounded-md'
              placeholder='ingresa tu localidad'
              pattern='^(?!\s*$)[A-Za-zÀ-ÿ\s]{1,40}$'
              value={isEditing.localidad} onChange={(e) => setIsEditing({ ...isEditing, localidad: e.target.value })}
            />
        }
      </div>
      <div className='flex space-x-2 items-end'>
        <p className='font-roboto underline font-bold uppercase text-xs'>nivel de ingles:</p>
        {
          !isEditing.status ?
            <div className='!no-underline !lowercase text-xs font-roboto mt-0.25'>{isEditing.nivel || <Skeleton className="h-4 w-[80px] rounded-md animate-pulse bg-gray-200 skeleton-bg-dark" />}</div>
            :
            <select className='text-xs font-roboto border border-gray-400 border-card rounded-md !p-1' value={isEditing.nivel} onChange={(e) => setIsEditing({ ...isEditing, nivel: (e.target.value as NivelIngles) })}>
              <option value="inicial" >inicial</option>
              <option value="basico">basico</option>
              <option value="intermedio">intermedio</option>
              <option value="avanzado">avanzado</option>
            </select>
        }
      </div>
      <div className='flex space-x-2 items-end'>
        <p className='font-roboto underline font-bold uppercase text-xs mt-2'>telefono de contacto:</p>
        {
          !isEditing.status ?
            <div className='!no-underline !lowercase text-xs font-roboto mt-0.25'>{isEditing.telefono || <Skeleton className="h-4 w-[80px] rounded-md animate-pulse bg-gray-200 skeleton-bg-dark" />}</div>
            :
            <input
              type="number" className='input-text !p-1 !text-xs !h-5 border border-gray-400 border-card rounded-md' placeholder='ingresa tu nro celular' value={Number(isEditing.telefono)} onChange={(e) => setIsEditing({ ...isEditing, telefono: (e.target.value ? Number(e.target.value) : null) })}
            />
        }
      </div>
      <div className='flex space-x-2 items-end'>
        <p className='font-roboto underline font-bold uppercase text-xs mt-2'>¿Recibir boletin?</p>
        {
          !isEditing.status ?
            <div className='!no-underline !lowercase text-xs font-roboto mt-0.25'>{isEditing.newsletter || <Skeleton className="h-4 w-[15px] rounded-md animate-pulse bg-gray-200 skeleton-bg-dark" />}</div>
            :
            <input
              type="checkbox" className='input-text !p-1 !text-xs !h-5 border border-gray-400 border-card rounded-md' checked={isEditing.newsletter === 'si'} onChange={(e) => setIsEditing({ ...isEditing, newsletter: e.target.checked ? 'si' : 'no' })}
            />
        }
      </div>
      <ToggleClient />

      <Button asChild variant='default' className='w-full lg:w-auto bg-black text-white btn-dark text-xs'>
        <Link href='/inicio/facturacion'>
          ver facturacion
        </Link>
      </Button>
      <div className='w-full text-center space-x-2'>
        <Button onClick={handleEditButton} disabled={isEditing.status} variant='destructive' className='w-full lg:w-auto btn-red text-xs bg-red-500 hover:bg-red-500/80'>
          Editar
        </Button>
        {
          isEditing.status &&
          <Button type="submit" className='w-full lg:w-auto btn-green text-xs bg-green-600 hover:bg-green-600/80 mt-1 text-white'>
            Guardar
          </Button>
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

