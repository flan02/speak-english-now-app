import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Paperclip, ArrowLeftCircle } from 'lucide-react';
import { addMessageToTicket, getTicketChat } from '@/app/(main)/inicio/cda/actions';
import { cn, translateTicketStatus } from '@/lib/utils';
import { Card } from '../ui/card';
import { auth } from '@/auth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { MessageChat } from '@/lib/types';
import { URL_ROUTES } from '@/services/api/routes';
import Link from 'next/link';

// type SearchParamProps = Promise<Record<string, string | undefined>>

type ChatViewProps = {
  ticketId: any
}

// Definimos el tipo para los mensajes que vienen de la DB


const ChatView = async ({ ticketId }: ChatViewProps) => {

  const ticketData = await getTicketChat(ticketId as unknown as string);

  const session = await auth()

  if (!ticketData || ticketData === null || !session?.user.id) {
    return <div className="p-4">Ticket no encontrado o no tienes acceso a esta seccion.</div>;
  }

  return (
    <div className="flex flex-col h-full px-1 lg:px-4">
      <header className="flex justify-between p-4 space-x-2 text-center text-lg font-bold bg-black dark:bg-white dark:text-black text-white rounded-md my-1 border-b border-gray-200 dark:border-[#222] tracking-wide">
        <div className='space-x-2 flex flex-col items-center w-full md:block'>
          <span className='text-base lg:text-lg'>Ticket #{ticketData.ticketNumber}</span>
          <span className='font-normal text-[11px]'>{`(estado: ${translateTicketStatus(ticketData.status)})`}</span>
        </div>
        <Link href={`${URL_ROUTES.CDA}`} className='underline hidden md:block'>
          <ArrowLeftCircle />
        </Link>
      </header>
      <div className='flex-1 overflow-y-auto p-4 space-y-4 border border-card rounded-md'>
        {ticketData.messages.map((msg: MessageChat, index: number) => (
          <div
            key={index}
            className={cn(
              "flex items-end gap-2",
              msg.role === 'USER' ? "justify-end" : "justify-start"
            )}
          >
            {msg.role !== 'USER' && (
              <Avatar className="w-8 h-8">
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
            )}
            <Card className={cn(
              "max-w-[75%] p-3 rounded-2xl",
              msg.role === 'USER'
                ? "bg-primary text-primary-foreground rounded-br-none"
                : "bg-muted rounded-bl-none"
            )}>
              <p className="text-sm font-roboto">{msg.content}</p>
              <p className="text-xs text-right mt-1 opacity-70">
                {`${new Date(msg.createdAt).toLocaleDateString('es-ES')} ${new Date(msg.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`}
              </p>
            </Card>
            {msg.role === 'USER' && (
              <Avatar className="w-8 h-8">
                <AvatarImage src={session.user?.image ?? ''} alt={session.user?.name ?? 'User'} />
                <AvatarFallback>{session.user?.name?.charAt(0) ?? 'U'}</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>
      <footer className="py-4 px-1 border-t border-gray-200 dark:border-[#222]">
        <form action={addMessageToTicket}>
          <input type="hidden" name="ticketNumber" value={`${ticketId}`} />
          <div className="relative">
            <Input name="message" placeholder="Escribe tu mensaje..." className="pr-20" required />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <Button type="button" size="icon" variant="ghost">
                <Paperclip className="w-5 h-5" />
              </Button>
              <Button type="submit" size="icon" variant="ghost">
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </form>
      </footer>
    </div>
  );
};

export default ChatView;

