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
    <Sidebar className="lg:absolute lg:top-2 lg:left-0 lg:h-[700px] lg:z-30 lg:mt-24 border-r border-r-gray-200 dark:border-r dark:border-r-gray-600/30 transition-all duration-300 ease-in-out group w-[70px] hover:lg:w-[240px]">
      <SidebarContent className="overflow-hidden">
        <SidebarGroup>
          <SidebarGroupLabel className="border-b rounded-none w-full mb-4 px-4 flex items-center">
            <Menu className="min-w-[24px]" />
            {/* <span className="hidden lg:block lg:mb-4">Menu</span> */}
            <span className="lg:text-base text-lg tracking-wider font-bold ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Menu
            </span>
            <SidebarTrigger className="lg:hidden absolute right-2 top-2 bg-highlight" />
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-6 lg:space-y-4 mt-4 lg:mt-0">
              {/* LINK TEMPLATE: Aplica a todos los ítems */}
              {NAVBAR_ROUTES.map((item) => (
                <SidebarMenuItem key={item.href} className="px-2">
                  <SidebarMenuButton
                    asChild
                    className="w-full justify-start hover:text-pink-700 dark:hover:text-pink-300 font-roboto transition-colors"
                  >
                    <Link href={item.href} className="flex items-center px-2">
                      <div className="min-w-[24px] flex justify-center">
                        {item.icon}
                      </div>
                      {/* TEXTO: Oculto por defecto, aparece en hover del PADRE (group-hover) */}
                      <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 lg:text-base text-xl tracking-wider font-bold xl:font-medium 2xl:font-medium whitespace-nowrap">
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
      <section className="mt-auto pb-4">
        <Card className="mx-1 overflow-hidden transition-all duration-300 shadow-none">
          <CardContent className="flex items-center p-2 relative">
            <div className="min-w-[32px] relative">
              <Image
                src={session.user.image!}
                alt={session.user.name!}
                width={32}
                height={32}
                className="rounded-full border-2 border-black"
              />
            </div>
            {/* Nombre de usuario: Solo visible en hover */}
            <div className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              <p className="font-orbitron font-bold text-[10px] lg:text-xs">
                {session.user.name}
              </p>
            </div>
          </CardContent>
          {/* El botón de SignOut podría necesitar un ajuste similar dentro de su componente */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <SignOut />
          </div>
        </Card>
      </section>
    </Sidebar>
  );
}