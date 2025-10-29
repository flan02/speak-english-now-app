'use client'
import H1 from '@/components/html/h1'
import { BookAIcon, MouseIcon, PenBoxIcon } from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // para permitir clicks
import { ClassMedatadataProps, FullCalendarProps, metodos_pago, ScheduleClassProps } from '@/lib/types'
import useCalendar from '@/hooks/useCalendar'
import { Skeleton } from '@/components/ui/skeleton'
import { MetodoDePagoBadge } from '@/components/reutilizable/MetodoDePagoBadge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import esLocale from '@fullcalendar/core/locales/es';
import { useRouter } from 'next/navigation'
import { storePaymentData } from '@/zustand/store'
import { Textarea } from '@/components/ui/textarea'
import { KY, Method } from '@/services/api'
import { cutId } from '@/lib/utils'



type Props = {}

export const scheduleClass = ({ info, setOpen, setSelectedDate }: ScheduleClassProps) => {
  const clicked = info.date;
  const today = new Date();

  const clickedYMD = clicked.getFullYear() * 10000 + (clicked.getMonth() + 1) * 100 + clicked.getDate();
  const todayYMD = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

  if (clickedYMD < todayYMD) return;
  if (clicked.getDay() === 0) return;
  if (clickedYMD === todayYMD && clicked.getTime() < today.getTime()) {
    setSelectedDate(null);
    return;
  }

  const formattedDate = clicked.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  setSelectedDate(formattedDate);
  setOpen(true);
};


const removePastDays = (arg: any) => {
  const cellDate = new Date(arg.date);
  console.log("Current Time", arg.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  cellDate.setHours(0, 0, 0, 0);

  if (cellDate < today) {
    return ["bg-gray-600/10", "bg-previous-day", "pointer-events-none"]; // gris y deshabilitado - 
  }
  return [];
}




const Reservas = (props: Props) => {


  const [upcomingClasses, setUpcomingClasses] = useState<any[]>([]);
  const router = useRouter()
  const [isCalendarReady, setIsCalendarReady] = useState(false);
  const [open, setOpen] = useState(false);
  const { events, isLoading, refetch } = useCalendar()
  const { isGroupClass, setIsGroupClass, selectedDate, setSelectedDate, studentsCount, setStudentsCount, price, setPrice, scheduledTime, setScheduledTime, text, setText, classMetadata, setClassMetadata } = storePaymentData();

  const fullCalendarEvents = upcomingClasses.map((meeting) => ({
    id: `#${cutId(meeting.id)}`,
    title: meeting.classType,
    start: meeting.startTime,
    end: meeting.endTime,
    color: meeting.status === 'scheduled' ? '#F0ED90' : '',
    extendedProps: {
      participants: meeting.maxParticipants,
      status: meeting.status === 'scheduled' ? 'Reservada' : meeting.status === 'completed' ? 'Completada' : 'Cancelada',
    },
  }))

  const fullCalendarContent = useCallback((arg: any) => {
    //console.log("Argumentos", arg);
    const { title, extendedProps } = arg.event;

    return (
      <div className="text-xs px-2 py-2 text-gray-500">
        <p className="font-roboto capitalize">Tipo: {title}</p>
        <p className="font-roboto capitalize">Participantes: {extendedProps.participants}</p>
        <p className="font-roboto capitalize">Estado: {extendedProps.status}</p>
        <p className="font-roboto capitalize">Id: {arg.event.id}</p>
      </div>
    );
  }, []);

  const handleClassTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const isGroup = e.target.value === "grupal";
    setIsGroupClass(isGroup)
    setClassMetadata({
      ...classMetadata,
      type: isGroup ? "grupal" : "individual",
      studentsCount: isGroup ? classMetadata.studentsCount : 1,
      price: isGroup ? classMetadata.price : 12000
    })
  }, [setIsGroupClass, setClassMetadata, classMetadata])


  const handlePayment = useCallback(() => {
    //setPayment(true);
    router.push('http://localhost:3000/inicio/pre-compra');
  }, [router])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (upcomingClasses?.length > 0) {
        setIsCalendarReady(true);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [upcomingClasses]);


  const removePastDays = useCallback((arg: any) => {
    const cellDate = new Date(arg.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    cellDate.setHours(0, 0, 0, 0);

    if (cellDate < today) {
      return ["bg-gray-200", "bg-previous-day", "pointer-events-none"];
    }
    return [];
  }, []);

  async function fetchMeeting() {
    try {
      const response = await KY(Method.GET, '/api/upcoming-classes')
      const data = await response.response;
      console.log("Data", data);
      setUpcomingClasses(data);
    } catch (error) {
      console.error("We couldn't retrieve any class for this calendar", error)
    }
  }

  useEffect(() => {
    fetchMeeting()
  }, [])

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
      <section className="w-full max-w-6xl mx-auto px-4 py-2">
        {
          isCalendarReady && !isLoading
            ?
            <FullCalendar
              allDaySlot={false} // ocultar el "All day"
              businessHours={{
                startTime: '17:00', // hora de inicio
                endTime: '21:00', // hora de fin
                daysOfWeek: [1, 2, 3, 4, 5, 6], // lunes a sabado
              }}
              dayHeaderFormat={{ weekday: 'short', day: 'numeric' }} // formato tipo “F 3”, “Sat 4”, etc.
              dateClick={(info) => scheduleClass({ info, setOpen, setSelectedDate })}
              dayCellClassNames={removePastDays}
              datesSet={() => setIsCalendarReady(true)}
              eventDidMount={(info) => {
                if (info.event.extendedProps?.status === 'confirmed') {
                  info.el.style.border = '1px solid #000';
                } else {
                  info.el.style.border = '1px solid #777';
                }
                setIsCalendarReady(true)
              }}
              events={fullCalendarEvents}
              eventContent={fullCalendarContent}
              expandRows={true}
              // headerToolbar={false} // oculta los botones de navegación
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridWeek' // timeGridDay
              }}
              height="200px"
              // hiddenDays={[0, 1]}
              initialView="timeGridWeek"
              initialDate={new Date()}
              locale={esLocale}
              nowIndicator={true}
              plugins={[timeGridPlugin, interactionPlugin]}
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

      <section className='space-y-2'>
        <Card className='w-full border border-card py-4 px-4'>
          <div className='flex space-x-2'>
            <PenBoxIcon />
            <h3 className='font-roboto uppercase font-bold text-base'>Detalles de la reserva</h3>
          </div>
          <article className='flex items-center space-x-[100px]'>
            <div className='min-w-[350px] lg:min-w-[500px] space-y-1 font-roboto'>
              <p className='text-base font-roboto'><span className='underline underline-offset-4'>Fecha</span>:  {selectedDate ? selectedDate : "no hay fecha seleccionada"}</p>
              <p className='text-base font-roboto'><span className='underline underline-offset-4'>Horario</span>:  {selectedDate && (scheduledTime.start && scheduledTime.end) ? `${scheduledTime.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} - ${scheduledTime.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}` : "no hay horario seleccionado"}</p>
              <div className='flex space-x-4 flex-col lg:flex-row space-y-2 lg:space-y-0'>
                <div className='flex space-x-2'>
                  <p className=''><span className='underline underline-offset-4'>Tipo de clase</span>:</p>
                  <select
                    name="tipo-clase"
                    id="tipo-clase"
                    className="dark:bg-black px-2 border-card rounded-lg"
                    value={isGroupClass ? "grupal" : "individual"}
                    onChange={handleClassTypeChange}
                  >
                    <option value="individual">Individual</option>
                    <option value="grupal">Grupal</option>
                  </select>

                </div>
                {
                  isGroupClass ? <div className='flex space-x-2'>
                    <p className=''><span className='underline underline-offset-4'>Cantidad de alumnos</span>:</p>
                    <select
                      name="cantidad-alumnos"
                      id="cantidad-alumnos"
                      value={studentsCount}
                      onChange={(e) => {
                        if (e.target.value === "1") setIsGroupClass(false);
                        setStudentsCount(parseInt(e.target.value))

                        let students = parseInt(e.target.value) > 0 ? Math.floor(parseInt(e.target.value) / 10000) : 1;
                        console.log("current students", students);
                        setClassMetadata({ ...classMetadata, type: "grupal", studentsCount: students, price: parseInt(e.target.value) })
                      }}
                      className='dark:bg-black px-1 border-card rounded-lg'>
                      <option value="0"></option>
                      <option value="24000">2</option>
                      <option value="30000">3</option>
                      <option value="40000">4</option>
                      <option value="50000">5</option>
                    </select>
                  </div> : null
                }
              </div>
              <p><span className='underline underline-offset-4'>Precio total</span>: <span className='font-roboto font-bold text-lg'>&nbsp; ${(studentsCount && classMetadata.type === "grupal") ? studentsCount : price}</span> </p>
              <div className='space-y-2'>
                <p className='underline underline-offset-4'>Objetivo de la clase:</p>
                <Textarea
                  maxLength={100}
                  placeholder='Describe el tema que necesitas ver durante la clase (opcional)...'
                  value={text}
                  onChange={(e) => setText(e.target.value)}

                />
                <p className="text-sm text-muted-foreground text-right">
                  {text?.length}/100
                </p>
              </div>
            </div>
            <div>
              <Button disabled={!text || !selectedDate || !scheduledTime.start || !scheduledTime.end || (isGroupClass && studentsCount == 0)} className='btn-dark bg-black text-white text-xs' onClick={handlePayment}>Agendar clase</Button>
            </div>
          </article>
        </Card>
      </section>

      <section className='mt-8'>
        <p className='text-sm italic'>* Luego de abonar la clase se crea el evento en el calendario de google y podras ver el acceso a la clase desde la seccion Clases Virtuales.</p>
        <p className='text-sm italic'>* Si necesitas un horario especial o tienes alguna consulta, no dudes en contactarnos por whatsapp al +11-3057-7799 o por email a chanivetdan@hotmail.com</p>
      </section>

      <br /><br /><br />
      <MetodoDePagoBadge title={metodos_pago} color="metodopago text-[9px] lg:text-xs text-yellow-700 bg-yellow-100 border-2 border-yellow-300 rounded-lg" />
      <br /><br /><br />
    </>
  )
}

export default Reservas

// const fullCalendarContent = useCallback((arg: any) => {

//   return (
//     <>
//       {
//         upcomingClasses && upcomingClasses.map((meeting) => {
//           <div className="text-xs px-2 py-2 text-gray-500">
//             <p className='font-roboto capitalize'>Tipo: {meeting.type}</p>
//             <p className='font-roboto capitalize'>Participantes: {meeting.participants}</p>
//             <p className='font-roboto capitalize'>Estado: {meeting.status}</p>
//             <p className='font-roboto capitalize'>Id: {meeting.id}</p>
//           </div>
//         })
//       }
//     </>
//   );
// }, [])

// const fullCalendarEvents: FullCalendarProps[] = useMemo(() => (
//   events?.map((slot) => ({
//     title: `${slot.start.dateTime} - ${slot.end.dateTime}`,
//     start: slot.start.dateTime,
//     end: slot.end.dateTime,
//     color: slot.status === 'confirmed' ? '#F0ED90' : 'red',
//   }))), [events]);

/*
      id: true,
      classType: true,
      maxParticipants: true,
      status: true
*/