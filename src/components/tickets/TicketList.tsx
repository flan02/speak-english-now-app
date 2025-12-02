import { TicketNumber } from '@/lib/types';
import { Ticket } from 'lucide-react';
import Link from 'next/link';
import { URL_ROUTES } from '@/services/api/routes';

type TicketListProps = {
  ticketList: TicketNumber[];
  ticketId: any
}

const TicketList = ({ ticketList, ticketId }: TicketListProps) => (
  <div className="flex flex-col h-full w-full">
    <div className="p-4 border-b border-gray-200 dark:border-[#222] text-center">
      <div className="text-xl font-bold flex justify-center">
        <Ticket className='inline-block mr-2 mt-0.5' />
        <h2>Tus Tickets</h2>
      </div>
    </div>
    <nav className="grid gap-1 py-2 px-0">
      {ticketList && ticketList.length > 0 ? (
        ticketList.filter((ticket) => ticket.status != 'CLOSED')
          .map((ticket: TicketNumber, index: number) => (
            <Link
              key={index}
              href={`${URL_ROUTES.TICKETS}?ticketId=${ticket.ticketNumber}`}
              className={`${ticketId == ticket.ticketNumber ? "bg-[#111] text-white dark:bg-white dark:text-black" : "bg-white dark:text-white dark:bg-[#111]"} w-full text-sm text-center p-3 transition-colors hover:underline font-bold tracking-wider border-card rounded-lg`}
            >
              #{ticket.ticketNumber}
            </Link>
          ))
      ) : (
        <div className='flex justify-center items-center font-bold h-[500px] border-r border-[rgba(0,0,0,0.1)] w-full'>
          <p>No hay tickets disponibles</p>
        </div>
      )}
    </nav>
  </div>
);
export default TicketList;