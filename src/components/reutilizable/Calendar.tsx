"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import esLocale from '@fullcalendar/core/locales/es';
import { ModalDayCalendar } from "./ModalDayCalendar";
import useCalendar from "@/hooks/useCalendar";
import { FullCalendarProps } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";
import { removePastDays, scheduleClass } from "@/lib/utils";

const Calendar = () => {

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [isCalendarReady, setIsCalendarReady] = useState(false);
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

    const horario = `${formatHour(start)}-${formatHour(end)}`;
    return (
      <div className="w-full text-center text-xs font-semibold rounded-md px-0 py-0.5 bg-slate-400 text-white z-50">
        {horario}
      </div>
    );
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCalendarReady(true);
    }, 500); // espera 0.5s para evitar flicker visual
    return () => clearTimeout(timer);
  }, [events]);

  return (
    <div className="lg:w-[800px] lg:mx-auto text-[10px] lg:text-xs">
      {
        isCalendarReady ?
          <FullCalendar
            aspectRatio={1.5}
            businessHours={{ startTime: '17:00', endTime: '21:00', daysOfWeek: [1, 2, 3, 4, 5, 6] }}
            dayMaxEventRows={3}
            dateClick={(info) => scheduleClass({ info, setOpen, setSelectedDate })}
            dayCellClassNames={removePastDays}
            events={fullCalendarEvents}
            eventContent={(fullCalendarContent)}
            initialView="dayGridMonth"
            moreLinkClick={(arg) => {
              arg.jsEvent.preventDefault();
              setSelectedDate(arg.date.toISOString().slice(0, 10));
              setOpen(true);
            }}
            locale={esLocale}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, googleCalendarPlugin]}
            validRange={{
              start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            }}
          />
          : <Skeleton className="h-[585px] w-full rounded-md animate-pulse bg-gray-200 skeleton-bg-dark" />
      }
      <ModalDayCalendar
        setSelectedDate={setSelectedDate}
        setOpen={setOpen}
        selectedDate={selectedDate}
        open={open}
        events={fullCalendarEvents} />
    </div>
  );
};

export default Calendar;




