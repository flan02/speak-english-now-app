"use client";

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import esLocale from '@fullcalendar/core/locales/es';
import { ModalDayCalendar } from "./ModalDayCalendar";
import useCalendar from "@/hooks/useCalendar";
import { FullCalendarProps } from "@/lib/types";





// * https://fullcalendar.io/docs/react
/* 
  googleCalendarApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
  events={{ googleCalendarId: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID }}
*/




const scheduleClass = ({ info, setOpen, setSelectedDate }: { info: { date: Date }, setOpen: React.Dispatch<React.SetStateAction<boolean>>, setSelectedDate: React.Dispatch<React.SetStateAction<string | null>> }) => {
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

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [open, setOpen] = useState(false);


  const { events, isLoading, refetch } = useCalendar()

  //console.log(events);

  const fullCalendarEvents: FullCalendarProps[] = events?.map((slot) => ({
    title: `${slot.start.dateTime} - ${slot.end.dateTime}`,
    start: slot.start.dateTime,
    end: slot.end.dateTime,
    color: slot.status === 'confirmed' ? 'green' : 'red',
  }))

  console.log(fullCalendarEvents);

  // <div style={{ maxWidth: "800px", margin: "0 auto", fontSize: "12px", fontFamily: "cursive" }}></div>
  return (
    <div className="w-[350px] lg:w-[800px] -ml-2 lg:mx-auto text-[10px] lg:text-xs" >
      <FullCalendar
        aspectRatio={1.5}
        businessHours={{ startTime: '17:00', endTime: '21:00', daysOfWeek: [1, 2, 3, 4, 5, 6] }}
        dayMaxEventRows={3}
        dateClick={(info) => scheduleClass({ info, setOpen, setSelectedDate })}
        dayCellClassNames={removePastDays}
        events={fullCalendarEvents}
        eventContent={(arg) => {
          const start = arg.event.start;
          const end = arg.event.end;
          const formatHour = (date: Date | null) => {
            if (!date) return "";
            return date.getHours().toString().padStart(2, "0") + "hs";
          };

          const horario = `${formatHour(start)}-${formatHour(end)}`;
          return (
            <div className="w-full text-center text-xs font-semibold rounded-md px-1 py-0.5 bg-slate-600 text-white">
              {horario}
            </div>
          );
        }}
        initialView="dayGridMonth"
        moreLinkClick={(arg) => {
          // Evitar que se abra el pop-up por defecto
          arg.jsEvent.preventDefault();
          // Abrir el modal para la fecha específica
          setSelectedDate(arg.date.toISOString().slice(0, 10));
          setOpen(true);
        }}
        locale={esLocale}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, googleCalendarPlugin]}

      />
      <ModalDayCalendar setSelectedDate={setSelectedDate} setOpen={setOpen} selectedDate={selectedDate} open={open} events={fullCalendarEvents} />
    </div>
  );
};

export default Calendar;


//BUNCH OF CALENDAR PROPS
// contentHeight="auto"
// eventClick={show_info}
// headerToolbar={{
//  googleCalendarApiKey={process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID}
//   left: "prev,next today",
//   center: "title",
//   right: "dayGridMonth,timeGridWeek,timeGridDay",
// }}
// events={{ googleCalendarId: process.env.NEXT_PUBLIC_AUTH_GOOGLE_SECRET }}
// weekends={false}
// eventClick={(info) => {
//   window.open(info.event.url, "_blank");
// }}
// dateClick={(info) => {
//   alert("Clicked on: " + info.dateStr);
//   console.log(info)
//   alert("Coordinates: " + info.jsEvent.pageX + "," + info.jsEvent.pageY);
// }}
// select={(info) => {
//   console.log(info)
//   alert("selected " + info.startStr + " to " + info.endStr);
// }}

/* 
const test_events = [                        // Lista de eventos
  { title: '17hs-18hs', date: '2025-09-12' },
  { title: '18hs-19hs', date: '2025-09-12' },
  { title: '19hs-20hs', date: '2025-09-12' },
  { title: '20hs-21hs', date: '2025-09-12' },
  { title: '18hs-19hs', date: '2025-09-15' },
  { title: '17hs-18hs', date: '2025-09-19' },
  { title: '18hs-19hs', date: '2025-09-19' },
  { title: '19hs-20hs', date: '2025-09-19' },
  { title: '20hs-21hs', date: '2025-09-19' }
]
*/