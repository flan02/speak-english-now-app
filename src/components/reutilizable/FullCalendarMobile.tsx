import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Event = {
  id: string;
  title: any;
  start: any;
  end: any;
  color: string;
  extendedProps: {
    participants: any;
    status: string;
  };
}


const FullCalendarMobile = ({ events }: { events: Event[] }) => {
  // Agrupamos los eventos por día
  const grouped = events.reduce<Record<string, Event[]>>((acc, event) => {
    const day = format(parseISO(event.start), "EEEE dd MMM", { locale: es })
    if (!acc[day]) acc[day] = []
    acc[day].push(event)
    return acc
  }, {})


  return (
    <div className="space-y-6 px-1 py-6">
      <p className="font-roboto px-2 text-sm text-center font-bold">Clases reservadas para esta semana</p>
      {Object.entries(grouped).map(([day, dayEvents]) => (
        <div key={day}>
          <h2 className="text-sm font-semibold dark:text-gray-300 mb-2">
            {day}
          </h2>
          <div className="space-y-2">
            {dayEvents.map((event) => (
              <Card
                key={event.id}
                className="dark:bg-black/80 bg-yellow-50 border border-card dark:border-gray-700"
              >
                <CardContent className="p-3 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-semibold">{event.title}</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      {format(parseISO(event.start), "HH:mm")} -{" "}
                      {format(parseISO(event.end), "HH:mm")}
                    </p>
                  </div>
                  {event.extendedProps?.status && (
                    <Badge
                      variant={
                        event.extendedProps.status === "RESERVADO"
                          ? "destructive"
                          : "secondary"
                      }
                      className="text-[10px] px-2 py-1"
                    >
                      {event.extendedProps.status}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default FullCalendarMobile





