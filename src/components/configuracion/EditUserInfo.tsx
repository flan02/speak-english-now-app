'use client'
import React, { useEffect } from 'react'
import ToggleClient from '../reutilizable/ToggleClient'
import { Button } from '../ui/button'
import Link from 'next/link'
import { KY, Method } from '@/services/api'
import { set } from 'date-fns'

type Props = {}

const EditUserInfo = (props: Props) => {
  const [isEditing, setIsEditing] = React.useState({
    status: false,
    localidad: '',
    nivelDeIngles: '',
    telefonoDeContacto: ''
  })

  const handleSaveBtn = async () => {
    const data = {
      localidad: isEditing.localidad,
      nivelDeIngles: isEditing.nivelDeIngles,
      telefonoDeContacto: isEditing.telefonoDeContacto
    }

    setIsEditing({ ...isEditing, status: false })

    console.log('before send user data:', data);
    try {
      const res = await KY(Method.POST, '/api/user-data', { json: data });
      console.log('response after send user data:', res);
    } catch (error) {
      console.error(error);
    }
  }





  const handleEditButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('edit button clicked')
    setIsEditing({ ...isEditing, status: true })
  }


  return (
    <form onSubmit={(e) => e.preventDefault()} className='space-y-3'>
      <div className='flex space-x-2 items-end'>
        <p className='font-roboto underline font-bold uppercase text-xs'>localidad:</p>
        {
          !isEditing.status ?
            <span className='!no-underline !lowercase text-xs font-roboto'>{isEditing.localidad || '-'}</span>
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
            <span className='!no-underline !lowercase text-xs font-roboto mt-0.25'>{isEditing.nivelDeIngles || '-'}</span>
            :
            <input
              pattern='^(?!\s*$)[A-Za-zÀ-ÿ\s]{1,40}$'
              type="text" className='input-text !p-1 !text-xs !h-5 border border-gray-400 border-card rounded-md' placeholder='ingresa tu nivel de ingles' value={isEditing.nivelDeIngles} onChange={(e) => setIsEditing({ ...isEditing, nivelDeIngles: e.target.value })} />
        }
      </div>
      <div className='flex space-x-2 items-end'>
        <p className='font-roboto underline font-bold uppercase text-xs mt-2'>telefono de contacto:</p>
        {
          !isEditing.status ?
            <span className='!no-underline !lowercase text-xs font-roboto mt-0.25'>{isEditing.telefonoDeContacto || '-'}</span>
            :
            <input
              pattern='^(?!\s*$)[A-Za-zÀ-ÿ\s]{1,40}$'
              type="number" className='input-text !p-1 !text-xs !h-5 border border-gray-400 border-card rounded-md' placeholder='ingresa tu nro celular' value={isEditing.telefonoDeContacto} onChange={(e) => setIsEditing({ ...isEditing, telefonoDeContacto: e.target.value })} />
        }
      </div>
      <ToggleClient />

      <Button asChild variant='default' className='w-full lg:w-auto bg-black text-white btn-dark text-xs'>
        <Link href='/inicio/facturacion'>
          ver facturacion
        </Link>
      </Button>
      <div className='w-full text-center space-x-2'>
        <Button disabled={isEditing.status} onClick={handleEditButton} variant='destructive' className='w-full lg:w-auto btn-red text-xs bg-red-500 hover:bg-red-500/80'>
          Editar
        </Button>
        {
          isEditing.status &&
          <Button type="submit" onClick={handleSaveBtn} className='w-full lg:w-auto btn-green text-xs bg-green-600 hover:bg-green-600/80 mt-1 text-white'>
            Guardar
          </Button>
        }
      </div>
    </form>
  )
}

export default EditUserInfo