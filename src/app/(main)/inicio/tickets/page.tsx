import ChatView from '@/components/tickets/ChatView';
import NoTicketSelected from '@/components/tickets/NoTicketSelected';
import TicketList from '@/components/tickets/TicketList';
import { getTickets } from '../cda/actions';
import Link from 'next/link';
import { URL_ROUTES } from '@/services/api/routes';
import { ArrowLeftCircle } from 'lucide-react';
import TicketSelectorMobile from '@/components/tickets/TicketSelectorMobile';

type TicketsPageProps = {
  searchParams: Promise<{
    ticketId?: string
  }>
}

export default async function TicketsPage({ searchParams }: TicketsPageProps) {
  const ticketsFound = await getTickets();
  const { ticketId } = (await searchParams) ?? {};

  return (
    <div className="h-full w-full">
      {/* Desktop View */}
      <div className="hidden md:grid md:grid-cols-[minmax(300px,_1fr)_3fr] h-[750px] w-full min-w-[350px]">
        <aside className="px-2 border-r border-gray-200 dark:border-[#111]">
          <TicketList ticketList={ticketsFound} ticketId={await ticketId} />
        </aside>
        <section className="flex flex-col">
          {ticketId ? (
            <ChatView ticketId={ticketId} />
          ) : (
            <div className="relative h-full">
              <Link href={`${URL_ROUTES.CDA}`} className='underline absolute top-6 right-6'>
                <ArrowLeftCircle />
              </Link>
              <NoTicketSelected />
            </div>
          )}
        </section>
      </div>

      {/* Mobile View */}
      <div className="md:hidden px-1 py-4 space-y-4">
        <div className='flex justify-end'>
          <Link href={`${URL_ROUTES.CDA}`} className='underline mr-1'>
            <ArrowLeftCircle />
          </Link>
        </div>
        <TicketSelectorMobile tickets={ticketsFound} currentTicketId={await ticketId} />
        {ticketId ? (
          <div className="h-[600px] border-t pt-4">
            <ChatView ticketId={ticketId} />
          </div>
        ) : (
          <div className="h-[400px] flex items-center justify-center">
            <NoTicketSelected />
          </div>
        )}
      </div>
    </div>
  );
}

