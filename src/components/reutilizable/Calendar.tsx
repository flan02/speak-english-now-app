"use client";

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import esLocale from '@fullcalendar/core/locales/es';
import { ModalDayCalendar } from "./ModalDayCalendar";

// * https://fullcalendar.io/docs/react
/* 
  googleCalendarApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
  events={{ googleCalendarId: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID }}
*/

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

// const show_info = () => {
//   alert("Info y estado de la clase aqui, codigo de referencia al usuario")
// }

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

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  console.log(selectedDate);
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", fontSize: "12px", fontFamily: "cursive" }}>
      <FullCalendar
        aspectRatio={1.5}
        businessHours={{ startTime: '17:00', endTime: '21:00', daysOfWeek: [1, 2, 3, 4, 5, 6] }}
        dayMaxEventRows={4}
        dateClick={(info) => scheduleClass({ info, setOpen, setSelectedDate })}
        dayCellClassNames={(arg) => {
          const cellDate = new Date(arg.date);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          cellDate.setHours(0, 0, 0, 0);

          if (cellDate < today) {
            return ["bg-gray-200/60 bg-previous-day", "pointer-events-none"]; // gris y deshabilitado
          }
          return [];
        }}
        events={test_events}
        height={700}
        initialView="dayGridMonth"
        googleCalendarApiKey={process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID}
        locale={esLocale}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, googleCalendarPlugin]}

      />
      <ModalDayCalendar setSelectedDate={setSelectedDate} setOpen={setOpen} selectedDate={selectedDate} open={open} />
    </div>
  );
};

export default Calendar;


//BUNCH OF CALENDAR PROPS
// eventClick={show_info}
// headerToolbar={{
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
