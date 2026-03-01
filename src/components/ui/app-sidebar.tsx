import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Card, CardContent } from "./card"; // Asegúrate que esta ruta sea correcta
import SignIn from "../reutilizable/sign-in"; // Asegúrate que esta ruta sea correcta
import { auth } from "@/auth";
import SignOut from "../reutilizable/sign-out"; // Asegúrate que esta ruta sea correcta
import Image from "next/image";
import { SidebarCloseLink as Link } from "@/components/reutilizable/SidebarCloseLink";
import {
  BookOpen, // <--- CAMBIO: Usamos BookOpen que es más seguro que BookAIcon
  Bot,
  Calendar,
  Computer,
  Dot,
  Home,
  Menu,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

export async function AppSidebar() {
  const session = await auth();

  if (!session?.user?.name) {
    return <SignIn />;
  }

  const NAVBAR_ROUTES = [
    { href: "/inicio", icon: <Home />, label: "Principal" },
    { href: "/inicio/mis-clases-virtuales", icon: <Computer />, label: "Clases Virtuales" },
    { href: "/inicio/mis-actividades", icon: <Bot />, label: "Actividades" },
    { href: "/inicio/calendario", icon: <Calendar />, label: "Calendario" },
    { href: "/inicio/reservas", icon: <BookOpen />, label: "Reservas" },
    { href: "/inicio/configuracion", icon: <Settings />, label: "Configuracion" },
  ]

  return (
    <Sidebar className={cn(
      "lg:absolute lg:top-2 lg:left-0 lg:h-[700px] lg:z-30 lg:mt-24 border-r border-r-gray-200 dark:border-r dark:border-r-gray-600/30 transition-all duration-300 ease-in-out group", "w-[280px] lg:w-[70px] lg:hover:w-[240px]"
    )}>
      <SidebarContent className="overflow-hidden">
        <SidebarGroup>
          <SidebarGroupLabel className="border-b rounded-none w-full mb-4 px-4 flex items-center">
            <Menu className="min-w-[24px]" />
            <span className="ml-4 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 lg:text-base text-lg tracking-wider font-bold whitespace-nowrap">Menu</span>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-6 lg:space-y-4 mt-4 lg:mt-0">
              {NAVBAR_ROUTES.map((item) => (
                <SidebarMenuItem key={item.href} className="px-2">
                  <SidebarMenuButton
                    asChild
                    className="w-full justify-start hover:text-pink-700 dark:hover:text-pink-400 font-roboto transition-colors dark:hover:bg-transparent"
                  >
                    <Link href={item.href} className="flex items-center px-2">
                      <div className="min-w-[24px] flex justify-center group-hover:lg:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <span className="ml-2 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 lg:text-base text-xl tracking-wider font-bold xl:font-medium 2xl:font-medium whitespace-nowrap">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User info and logout */}
      <section className="mt-auto pb-4 px-2">
        <Card className="mx-1 overflow-hidden shadow-none border-none bg-transparent">
          <CardContent className="flex items-center p-2 relative">
            {/* Imagen de perfil: Siempre visible */}
            <div className="min-w-[32px] flex-shrink-0">
              <Image
                src={session.user.image!}
                alt={session.user.name!}
                width={32}
                height={32}
                className="rounded-full border-2 border-black object-cover"
              />
            </div>

            <div
              className={cn(
                "ml-3 whitespace-nowrap transition-all duration-500 ease-in-out", "lg:opacity-0 lg:-translate-x-4 lg:pointer-events-none lg:group-hover:opacity-100 lg:group-hover:translate-x-0 lg:group-hover:pointer-events-auto lg:group-hover:delay-150", "opacity-100 translate-x-0"
              )}
            >
              <p className="font-orbitron font-bold text-[10px] lg:text-xs">
                {session.user.name}
              </p>
            </div>
          </CardContent>

          <div
            className={cn(
              "whitespace-nowrap overflow-hidden",
              "lg:opacity-0 lg:-translate-x-4 lg:pointer-events-none lg:group-hover:opacity-100 lg:group-hover:translate-x-0 lg:group-hover:pointer-events-auto lg:group-hover:delay-200",
              "opacity-100 translate-x-0 px-2 pb-2"
            )}
          >
            <SignOut />
          </div>
        </Card>
      </section>
    </Sidebar>
  );
}