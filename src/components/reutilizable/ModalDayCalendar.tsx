"use client"
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";


export function ModalDayCalendar({ setOpen, setSelectedDate, selectedDate, open }: { setOpen: (open: boolean) => void, setSelectedDate: (date: string | null) => void, selectedDate: string | null, open: boolean }) {
  // const [open, setOpen] = useState(false);
  // const [selectedDate, setSelectedDate] = useState<string | null>(null);

  //console.log("Selected date in modal:", selectedDate);
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