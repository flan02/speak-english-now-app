// src/app/(main)/inicio/tickets/page.tsx
'use client'
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Send, Paperclip, Ticket } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- TIPOS Y DATOS DE EJEMPLO ---
type Message = {
  id: number;
  text: string;
  timestamp: string;
  sender: 'user' | 'support';
};

type Ticket = {
  id: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  timestamp: string;
  messages: Message[];
};


// --- FIN DE DATOS DE EJEMPLO ---


// --- COMPONENTES HIJOS ---

const TicketList = ({ onSelectTicket, selectedTicketId }: { onSelectTicket: (ticket: Ticket) => void, selectedTicketId: string | null }) => (
  <div className="flex flex-col h-full bg-background border border-red-500">
    <div className="p-4 border-b">
      <div className="text-xl font-bold flex">
        <Ticket className='inline-block mr-2 mt-0.5' />
        <h2>Tickets de Soporte</h2>
      </div>
    </div>
    <div className="flex-1 overflow-y-auto border border-purple-500">
      <nav className="grid gap-1 p-2 border border-yellow-500">
        {/* INSERT TICKETS LIST HERE BY USER */}
      </nav>
    </div>
  </div>
);

const ChatView = ({ ticket, onBack }: { ticket: Ticket, onBack: () => void }) => (
  <div className="flex flex-col h-full">
    <header className="flex items-center p-4 border-b">
      <Button onClick={onBack} variant="ghost" size="icon" className="md:hidden mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>
      </Button>
      <Avatar className="w-10 h-10">
        <AvatarImage src={ticket.userAvatar} alt={ticket.userName} />
        <AvatarFallback>{ticket.userName.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="ml-4">
        <p className="text-lg font-semibold">{ticket.userName}</p>
        <p className="text-sm text-muted-foreground">ID del Ticket: {ticket.id}</p>
      </div>
    </header>

    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {ticket.messages.map((msg) => (
        <div
          key={msg.id}
          className={cn(
            "flex items-end gap-2",
            msg.sender === 'user' ? "justify-end" : "justify-start"
          )}
        >
          <Card className={cn(
            "max-w-[75%] p-3 rounded-2xl",
            msg.sender === 'user'
              ? "bg-primary text-primary-foreground rounded-br-none"
              : "bg-muted rounded-bl-none"
          )}>
            <p className="text-sm">{msg.text}</p>
            <p className="text-xs text-right mt-1 opacity-70">{msg.timestamp}</p>
          </Card>
        </div>
      ))}
    </div>

    <footer className="p-4 border-t bg-background">
      <form className="relative">
        <Input placeholder="Escribe tu mensaje..." className="pr-20" />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <Button type="button" size="icon" variant="ghost">
            <Paperclip className="w-5 h-5" />
          </Button>
          <Button type="submit" size="icon" variant="ghost">
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </form>
    </footer>
  </div>
);

const NoTicketSelected = () => (
  <div className="hidden md:flex flex-col items-center justify-center h-full text-center text-muted-foreground bg-background">
    <div className="p-8 border-2 border-dashed rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-inbox"><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /><path d="M16 12h-8" /></svg>
    </div>
    <h3 className="mt-6 text-lg font-semibold">Bandeja de entrada de soporte</h3>
    <p className="max-w-xs mt-2 text-sm">
      Selecciona un ticket de la lista para ver la conversación y responder.
    </p>
  </div>
);


// --- COMPONENTE PRINCIPAL ---

export default function TicketsPage() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  // En mobile, empezamos sin ticket seleccionado para mostrar la lista.
  // En desktop, podemos seleccionar el primero por defecto.
  useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) { // 768px es el breakpoint 'md' de Tailwind
      // setSelectedTicket(dummyTickets[0]);
    }
  });

  const handleSelectTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  }

  const handleBack = () => {
    setSelectedTicket(null);
  }

  return (
    <div className="grid md:grid-cols-[minmax(300px,_1fr)_3fr] h-[calc(100vh-4rem)] w-full min-w-[350px] border border-blue-500">

      {/* Vista Mobile: Muestra lista o chat */}
      <div className="md:hidden border border-blue-500">
        {!selectedTicket ? (
          <TicketList

            onSelectTicket={handleSelectTicket}
            // selectedTicketId={selectedTicket?.id || null}
            selectedTicketId={null}
          />
        ) : (
          <ChatView ticket={selectedTicket} onBack={handleBack} />
        )}
      </div>

      {/* Vista Desktop: Muestra ambos */}
      <aside className="hidden md:flex border border-green-500">
        <TicketList

          onSelectTicket={handleSelectTicket}
          selectedTicketId={selectedTicket?.id || null}
        />
      </aside>
      <section className="hidden md:flex flex-col border border-orange-400">
        {selectedTicket ? (
          <ChatView ticket={selectedTicket} onBack={handleBack} />
        ) : (
          <NoTicketSelected />
        )}
      </section>
    </div>
  );
}
