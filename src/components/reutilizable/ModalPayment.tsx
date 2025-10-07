import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { LanguagesIcon } from 'lucide-react';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  date?: string | null;
  time?: { start: Date | null; end: Date | null };
}

const ModalPayment = ({ open, setOpen, date, time }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="lg:max-w-2xl px-1 lg:px-8 py-8 lg:py-8 bg-modal rounded-lg">
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
            Reserva tu clase de prueba gratuita o tu clase regular
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
            <p>Elegir metodo de pago: mercado pago / criptomonedas ...</p>
          </article>
        </DialogHeader>

      </DialogContent>
    </Dialog>
  )
}

export default ModalPayment