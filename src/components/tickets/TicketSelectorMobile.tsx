'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TicketNumber } from "@/lib/types";
import { translateTicketStatus } from "@/lib/utils";
import { URL_ROUTES } from "@/services/api/routes";
import { useRouter } from "next/navigation";

type TicketSelectorMobileProps = {
  tickets: TicketNumber[];
  currentTicketId?: string;
}

export default function TicketSelectorMobile({ tickets, currentTicketId }: TicketSelectorMobileProps) {
  const router = useRouter();

  const handleTicketChange = (ticketNumber: string) => {
    router.push(`${URL_ROUTES.TICKETS}?ticketId=${ticketNumber}`);
  };

  const openTickets = tickets.filter(ticket => ticket.status !== 'CLOSED');

  return (
    <div className="w-full">
      <h2 className="text-lg font-bold mb-2 text-center">Selecciona un Ticket</h2>
      <Select onValueChange={handleTicketChange} defaultValue={currentTicketId}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Elige un ticket para ver el chat..." className="text-[10px]" />
        </SelectTrigger>
        <SelectContent className="bg-gray-100 dark:bg-black -ml-1.5">
          {
            openTickets.length > 0 ? (
              openTickets.map((ticket) => (
                <SelectItem key={ticket.ticketNumber} value={ticket.ticketNumber} className="border-b dark:border-[#333] border-gray-200 py-2 bg-gray-100 dark:bg-black">
                  <span className="text-sm mr-2 font-bold">#{ticket.ticketNumber}</span>
                  <span className="text-xs">({translateTicketStatus(ticket.status)})</span>
                </SelectItem>
              ))
            ) : (
              <div className="p-4 text-sm text-muted-foreground">No hay tickets abiertos.</div>
            )}
        </SelectContent>
      </Select>
    </div>
  )
}
