const NoTicketSelected = () => (
  <div className="hidden md:flex flex-col items-center justify-center h-full text-center text-muted-foreground bg-background rounded-md m-4 border border-card">
    <div className="p-8 border-2 border-dashed rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-inbox"><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /><path d="M16 12h-8" /></svg>
    </div>
    <h3 className="mt-6 text-lg font-semibold">Bandeja de entrada de soporte</h3>
    <p className="max-w-xs mt-2 text-xs font-roboto">
      Selecciona un ticket de la lista para ver el historial de chats.
    </p>
  </div>
);

export default NoTicketSelected;