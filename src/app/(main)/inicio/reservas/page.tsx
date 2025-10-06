'use client'
import H1 from '@/components/html/h1'
import { BookAIcon, MouseIcon, PenBoxIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // para permitir clicks
import { FullCalendarProps, metodos_pago, ScheduleClassProps } from '@/lib/types'
import useCalendar from '@/hooks/useCalendar'
import { ModalDayCalendar } from '@/components/reutilizable/ModalDayCalendar'
import { Skeleton } from '@/components/ui/skeleton'
import { MetodoDePagoBadge } from '@/components/reutilizable/MetodoDePagoBadge'
import { Button } from '@/components/ui/button'


type Props = {}

export const scheduleClass = ({ info, setOpen, setSelectedDate }: ScheduleClassProps) => {
  const clicked = info.date; // es un objeto Date de FullCalendar
  const today = new Date();

  // Comparamos solo año, mes y día
  const clickedYMD = clicked.getFullYear() * 10000 + (clicked.getMonth() + 1) * 100 + clicked.getDate();
  const todayYMD = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

  // Bloqueamos solo si es anterior a hoy
  if (clickedYMD < todayYMD) return;

  // Bloquear domingos
  if (clicked.getDay() === 0) return;

  // Día válido → abrir modal
  setSelectedDate(info.date.toISOString().slice(0, 10));
  setOpen(true);
}

const removePastDays = (arg: any) => {
  const cellDate = new Date(arg.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  cellDate.setHours(0, 0, 0, 0);

  if (cellDate < today) {
    return ["bg-gray-600/10 bg-previous-day", "pointer-events-none"]; // gris y deshabilitado
  }
  return [];
}

const Reservas = (props: Props) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [payment, setPayment] = useState(false);
  const [isCalendarReady, setIsCalendarReady] = useState(false);
  const [scheduledTime, setScheduledTime] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
  const [open, setOpen] = useState(false);
  const { events, isLoading, refetch } = useCalendar()
  const fullCalendarEvents: FullCalendarProps[] = events?.map((slot) => ({
    title: `${slot.start.dateTime} - ${slot.end.dateTime}`,
    start: slot.start.dateTime,
    end: slot.end.dateTime,
    color: slot.status === 'confirmed' ? 'green' : 'red',
  }))

  const fullCalendarContent = (arg: any) => {
    const start = arg.event.start;
    const end = arg.event.end;
    const formatHour = (date: Date | null) => {
      if (!date) return "";
      return date.getHours().toString().padStart(2, "0") + "hs";
    };

    // w-full text-center text-xs font-semibold rounded-md px-1 py-0.5 bg-slate-600 text-white

    // TODO: Here's the place where meeting data from db will be shown

    const horario = `${formatHour(start)}-${formatHour(end)}`;


    return (
      <div className="text-xs">
        info del meeting desde la db...
      </div>
    );
  }

  const handlePayment = () => setPayment(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCalendarReady(true);
    }, 500); // espera 0.5s para evitar flicker visual
    return () => clearTimeout(timer);
  }, [events]);

  return (
    <>
      <div className='flex space-x-4 items-end'>
        <BookAIcon className='mb-0.5' />
        <H1 title='Reservas' />
      </div>
      <article className='flex space-x-1 items-end'>
        <MouseIcon />
        <h2 className='font-roboto uppercase font-bold text-xs'>Clickea sobre un horario disponible para iniciar el proceso de reserva...</h2>
      </article>
      <section className="w-full max-w-6xl mx-auto p-4">
        {
          isCalendarReady
            ? <FullCalendar
              plugins={[timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              allDaySlot={false} // ocultar el "All day"
              dayHeaderFormat={{ weekday: 'short', day: 'numeric' }} // formato tipo “F 3”, “Sat 4”, etc.
              dateClick={(info) => scheduleClass({ info, setOpen, setSelectedDate })}
              dayCellClassNames={removePastDays}
              datesSet={() => setIsCalendarReady(true)}
              eventDidMount={() => setIsCalendarReady(true)}
              events={fullCalendarEvents}
              eventContent={(fullCalendarContent)}
              expandRows={true}
              headerToolbar={false} // oculta los botones de navegación
              height="250px"
              locale={"es"}
              nowIndicator={false}
              slotMinTime="17:00:00" // hora mínima visible
              slotMaxTime="21:00:00" // hora máxima visible
              slotDuration="01:00:00" // bloques de 1 hora
              selectable={true}
              // selectMirror={true}
              slotLabelInterval="01:00"
              slotLabelFormat={{
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
              }}
              select={(info) => {
                setScheduledTime({ start: info.start, end: info.end })

              }}
              validRange={{
                start: new Date().toISOString().split("T")[0], // 🔒 bloquea días previos al actual
              }}
            />
            : <Skeleton className="h-[450px] w-full rounded-md animate-pulse bg-gray-200 skeleton-bg-dark" />
        }
      </section>
      {/* <ModalDayCalendar setSelectedDate={setSelectedDate} setOpen={setOpen} selectedDate={selectedDate} open={open} events={fullCalendarEvents} /> */}

      <section className='space-y-2'>
        <div className='flex space-x-2'>
          <PenBoxIcon />
          <h3 className='font-roboto uppercase font-bold text-base'>Detalles de la reserva</h3>
        </div>
        <article className='flex items-center space-x-[200px]'>
          <div className='min-w-[350px]'>
            <p className='text-base font-roboto'>Fecha: {selectedDate}</p>
            <p className='text-base font-roboto'>Horario: {scheduledTime.start && scheduledTime.end ? `${scheduledTime.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} - ${scheduledTime.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}` : "No hay horario seleccionado"}</p>
          </div>
          <div>
            <Button disabled={!selectedDate || !scheduledTime.start || !scheduledTime.end} className='btn-dark bg-black text-white text-xs' onClick={handlePayment}>Agendar clase</Button>
          </div>
        </article>
      </section>

      <section className='mt-8'>
        <p className='text-sm italic'>* Luego de abonar la clase se crea el evento y recibirás un enlace a tu email para acceder a la misma en el horario que elegiste.</p>
        <p className='text-sm italic'>* Si necesitas un horario especial o tienes alguna consulta, no dudes en contactarnos por whatsapp al +11-3057-7799 o por email a chanivetdan@hotmail.com / +11-3057-7799</p>
      </section>

      <br /><br /><br />
      <MetodoDePagoBadge title={metodos_pago} color="metodopago text-[9px] lg:text-xs text-yellow-700 bg-yellow-100 border-2 border-yellow-300 rounded-lg" />
      <br /><br /><br />

      <ModalDayCalendar setSelectedDate={setSelectedDate} setOpen={setPayment} selectedDate={selectedDate} open={payment} events={fullCalendarEvents} />
    </>
  )
}

export default Reservas