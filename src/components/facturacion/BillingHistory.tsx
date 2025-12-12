import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CreditCard, DollarSign, Hash, Users, Receipt } from "lucide-react";
// Asegúrate de importar tu función toArgentinaTZ correctamente
// import { toArgentinaTZ } from "@/lib/utils"; 

// Props interface (ajusta según tus tipos reales)
interface Bill {
  createdAt: string | Date;
  preferenceId: string;
  maxParticipants: number;
  price: number;
  // Agrega otros campos si los tienes
}

interface BillingHistoryProps {
  billingHistory: Bill[];
}

export default function BillingHistory({ billingHistory }: BillingHistoryProps) {
  // Función auxiliar simulada si no la tienes importada
  const toArgentinaTZ = (date: string | Date) => new Date(date).toLocaleString("es-AR");

  if (billingHistory.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <Receipt className="w-12 h-12 mb-4 opacity-20" />
        <p>No hay historial de facturación disponible.</p>
      </div>
    );
  }

  return (
    <div className="w-full p-2 lg:p-4">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-1 xl:grid-cols-1">
        {
          billingHistory.map((bill, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow border border-card p-6">
              <CardHeader className="pb-2 bg-muted/30">
                <CardTitle className="flex items-center justify-between text-base font-medium">
                  <span className="flex items-center gap-2 font-roboto font-bold">
                    <Receipt className="w-4 h-4 text-primary" />
                    Factura # {index + 1}
                  </span>
                  <span className="text-xs font-normal text-muted-foreground bg-white/50 px-2 py-1 rounded-full border border-blue-300">
                    MercadoPago
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-4 grid gap-3 text-sm">
                {/* Fecha */}
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full dark:bg-blue-900/30">
                    <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Fecha de pago</span>
                    <span className="font-medium">{toArgentinaTZ(bill.createdAt)}</span>
                  </div>
                </div>

                {/* Monto / Precio */}
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full dark:bg-green-900/30">
                    <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Monto total</span>
                    {/* Asumiendo que preferenceId es el precio en tu ejemplo original, ajústalo */}
                    <span className="font-bold text-lg text-green-700 dark:text-green-400">
                      {/* {formatCurrency(bill.price)}  "$ " + bill.preferenceId.slice(0, 5) */}
                      {`$ ${bill.price.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                {/* Estudiantes */}
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-full dark:bg-purple-900/30">
                    <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Participantes</span>
                    <span className="font-medium">{bill.maxParticipants} estudiante(s)</span>
                  </div>
                </div>

                {/* ID Orden (Hash) - Oculto parcialmente para estética */}
                <div className="mt-2 pt-2 border-t flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Hash className="w-3 h-3" /> ID Orden
                  </span>
                  <span className="font-mono bg-muted px-1 rounded select-all">
                    {/* {bill.preferenceId.substring(0, 12)}... */}
                    {bill.preferenceId.substring(0, 12)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}