"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import esLocale from '@fullcalendar/core/locales/es';

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

const show_info = () => {
  alert("Info y estado de la clase aqui, codigo de referencia al usuario")
}

const Calendar = () => {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", fontSize: "12px", fontFamily: "cursive" }}>
      <FullCalendar
        aspectRatio={1.5}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, googleCalendarPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          //left: "prev,next today",
          //center: "title",
          //right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={700}
        locale={esLocale}
        googleCalendarApiKey={process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID}
        // events={{ googleCalendarId: process.env.NEXT_PUBLIC_AUTH_GOOGLE_SECRET }}
        dayMaxEventRows={4} // allow "more" link when too many events
        events={test_events}
        businessHours={{ startTime: '17:00', endTime: '21:00', daysOfWeek: [1, 2, 3, 4, 5, 6] }}
        // weekends={false}
        // eventClick={(info) => {
        //   window.open(info.event.url, "_blank");
        // }}
        eventClick={show_info}
      // dateClick={(info) => {
      //   alert("Clicked on: " + info.dateStr);
      //   console.log(info)
      //   alert("Coordinates: " + info.jsEvent.pageX + "," + info.jsEvent.pageY);
      // }}
      // select={(info) => {
      //   console.log(info)
      //   alert("selected " + info.startStr + " to " + info.endStr);
      // }}
      />
    </div>
  );
};

export default Calendar;
