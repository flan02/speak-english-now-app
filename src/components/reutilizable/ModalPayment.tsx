import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { LanguagesIcon } from 'lucide-react';
import { ClassMedatadataProps } from '@/lib/types';
import { Button } from '../ui/button';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  date?: string | null;
  time?: { start: Date | null; end: Date | null };
  classMetadata: ClassMedatadataProps;
}

const ModalPayment = ({ open, setOpen, date, time, classMetadata }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="lg:max-w-2xl px-1 lg:p-12 py-8 bg-modal rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-[10px] text-left lg:text-base lg:text-center">
            <div className="flex items-end space-x-4">
              <div className="w-full flex items-end">

                <LanguagesIcon className="pr-2 text-purple-500/70 size-8" />
                <h1 className="text-xl lg:text-xl font-bold text-lime-950">HABLA</h1>
                <h1 className="text-xl lg:text-xl font-bold bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">INGLES</h1>
                <h1 className="text-xl lg:text-xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">YA</h1>
              </div>
            </div>
          </DialogTitle>
          <DialogDescription className="text-xs lg:text-sm text-left mt-2 mb-6 font-roboto">
            Revisa los datos de tu clase antes de proceder al pago
          </DialogDescription>
          <article className='mb-6'>
            {
              <div className='flex space-x-1 bg-black text-white px-4 py-1 w-max rounded-lg time-bg-badge'>
                <span className='font-roboto font-bold text-lg'>{`${date}`}</span>
                <span className='font-bold font-roboto text-lg'>{`a las (${time?.start?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} - ${time?.end?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })})`}</span>
              </div>
            }
          </article>

          <article>
            {
              classMetadata &&
              <div className='font-roboto space-y-4 text-xl dark:text-white'>
                <p>Tipo de clase: <span className='font-bold capitalize'>&nbsp; {classMetadata.type}</span></p>
                <p>Cantidad de estudiantes: <span className='font-bold'>&nbsp; {classMetadata.studentsCount == 0 ? 1 : classMetadata.studentsCount}</span></p>
                <p>Precio: <span className='font-bold'>&nbsp; ${classMetadata.price}</span></p>
              </div>
            }
          </article>
          <Button className='w-full mt-8 bg-purple-700 hover:bg-purple-600 text-white tracking-wider text-base'>Procesar pago</Button>
        </DialogHeader>

      </DialogContent>
    </Dialog>
  )
}

export default ModalPayment