"use client"
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { FullCalendarProps } from "@/lib/types";
import { start } from "repl";
import { title } from "process";




type ModalDayCalendarProps = {
  setOpen: (open: boolean) => void,
  setSelectedDate: (date: string | null) => void,
  selectedDate: string | null,
  open: boolean,
  events: FullCalendarProps[]
}

export function ModalDayCalendar({ setOpen, setSelectedDate, selectedDate, open, events }: ModalDayCalendarProps) {

  const filteredByDayEvents = selectedDate
    ? events.filter((ev) => {
      const eventDate = new Date(ev.start).toISOString().split('T')[0]

      return eventDate === selectedDate
    })
    : []


  const slots = [
    { start: 17, end: 18 },
    { start: 18, end: 19 },
    { start: 19, end: 20 },
    { start: 20, end: 21 }
  ]

  const isBooked = selectedDate
    ? slots.map((sl) => {
      const slotStart = new Date(`${selectedDate}T${String(sl.start).padStart(2, "0")}:00:00`);
      const slotEnd = new Date(`${selectedDate}T${String(sl.end).padStart(2, "0")}:00:00`);

      const booked = events.some((ev) =>
        new Date(ev.start).getTime() === slotStart.getTime() &&
        new Date(ev.end).getTime() === slotEnd.getTime()
      )

      const label = {
        title: booked ? 'RESERVADO' : 'DISPONIBLE',
        start: slotStart,
        end: slotEnd
      }

      return label
    })
    : []


  return (<Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="lg:max-w-2xl px-1 lg:px-12 py-8 lg:py-16 bg-modal rounded-lg">
      <DialogHeader>
        <DialogTitle className="text-[10px] text-left lg:text-base lg:text-center">
          ver horarios disponibles
        </DialogTitle>
      </DialogHeader>
      {
        selectedDate && (
          <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "title",
              center: "",
              right: "",
            }}
            events={isBooked}
            eventContent={(arg) => {
              const isReserved = arg.event.title === "RESERVADO";
              return (
                <div className={`w-full text-center text-xs font-semibold rounded-md tracking-wide py-1 mt-0 ${isReserved ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>
                  {arg.event.title}
                </div>
              );
            }}
            initialView="timeGridDay"
            initialDate={selectedDate}
            locale={"es"}
            slotMinTime="17:00:00"
            slotMaxTime="21:00:00"
            slotDuration="01:00:00"
            slotLabelFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
            slotLabelContent={(arg) => {
              const startHour = arg.date.getHours();
              const endHour = startHour + 1;
              return `${String(startHour).padStart(2, "0")}:00 a ${String(endHour).padStart(2, "0")}:00`;
            }}
            allDaySlot={false}
            selectable={true}
            select={(info) => {
              // alert(`Reserva desde ${info.startStr} hasta ${info.endStr}`);
              setOpen(true);
              // setSelectedDate(info.startStr);
            }}
            height="28vh"
          />
        )
      }
    </DialogContent>
  </Dialog>
  )
}