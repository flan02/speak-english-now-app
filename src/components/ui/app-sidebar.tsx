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
  Settings,
} from "lucide-react";

export async function AppSidebar() {
  const session = await auth();

  if (!session?.user?.name) {
    return <SignIn />;
  }

  return (
    <Sidebar className="lg:absolute lg:top-2 lg:left-0 lg:h-[700px] xl:w-[220px] 2xl:w-[240px] lg:z-30 lg:mt-24 border-r border-r-gray-200 dark:border-r dark:border-r-gray-600/30">
      <SidebarContent className="min-w-[340px]">
        <SidebarGroup>
          <SidebarGroupLabel>
            <span className="hidden lg:block lg:mb-4">Menu</span>
            <SidebarTrigger className="lg:hidden absolute right-2 top-2 bg-highlight" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-6 lg:space-y-1 mt-4 w-min mx-auto lg:mt-0 lg:w-full lg:mx-0">

              {/* 1. PRINCIPAL */}
              <SidebarMenuItem className="text-left">
                <SidebarMenuButton
                  asChild
                  className="xl:w-[210px] 2xl:w-[230px] hover:text-white hover:bg-black dark:hover:bg-white dark:hover:text-black font-roboto"
                >
                  <Link href="/inicio">
                    <Home />
                    <span className="lg:text-lg text-xl tracking-wider font-bold xl:font-medium 2xl:font-medium">
                      Principal
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* 2. CLASES VIRTUALES */}
              <SidebarMenuItem className="text-left">
                <SidebarMenuButton
                  asChild
                  className="xl:w-[210px] 2xl:w-[230px] hover:text-white hover:bg-black dark:hover:bg-white dark:hover:text-black font-roboto"
                >
                  <Link href="/inicio/mis-clases-virtuales">
                    <Computer />
                    <span className="lg:text-lg text-xl tracking-wider font-bold xl:font-medium 2xl:font-medium">
                      Clases Virtuales
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* 3. ACTIVIDADES */}
              <SidebarMenuItem className="text-left">
                <SidebarMenuButton
                  asChild
                  className="xl:w-[210px] 2xl:w-[230px] hover:text-white hover:bg-black dark:hover:bg-white dark:hover:text-black font-roboto"
                >
                  <Link href="/inicio/mis-actividades">
                    <Bot />
                    <span className="lg:text-lg text-xl tracking-wider font-bold xl:font-medium 2xl:font-medium">
                      Actividades
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* 4. CALENDARIO */}
              <SidebarMenuItem className="text-left">
                <SidebarMenuButton
                  asChild
                  className="xl:w-[210px] 2xl:w-[230px] hover:text-white hover:bg-black dark:hover:bg-white dark:hover:text-black font-roboto"
                >
                  <Link href="/inicio/calendario">
                    <Calendar />
                    <span className="lg:text-lg text-xl tracking-wider font-bold xl:font-medium 2xl:font-medium">
                      Calendario
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* 5. RESERVAS (EL EX-MALDITO) */}
              <SidebarMenuItem className="text-left">
                <SidebarMenuButton
                  asChild
                  className="xl:w-[210px] 2xl:w-[230px] hover:text-white hover:bg-black dark:hover:bg-white dark:hover:text-black font-roboto"
                >
                  <Link href="/inicio/reservas">
                    <BookOpen /> {/* Icono seguro */}
                    <span className="lg:text-lg text-xl tracking-wider font-bold xl:font-medium 2xl:font-medium">
                      Reservas
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* 6. CONFIGURACIÓN */}
              <SidebarMenuItem className="text-left">
                <SidebarMenuButton
                  asChild
                  className="xl:w-[210px] 2xl:w-[230px] hover:text-white hover:bg-black dark:hover:bg-white dark:hover:text-black font-roboto"
                >
                  <Link href="/inicio/configuracion">
                    <Settings />
                    <span className="lg:text-lg text-xl tracking-wider font-bold xl:font-medium 2xl:font-medium">
                      Configuracion
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User info and logout */}
      <section>
        <Card className="border-card px-1 py-2 mx-1">
          <CardContent className="flex items-center relative">
            <Dot
              color="green"
              size={52}
              fill=""
              className="absolute top-1 left-0"
            />
            <Image
              src={session.user.image!}
              alt={session.user.name!}
              width={32}
              height={32}
              className="rounded-full mr-2 border-2 border-black"
            />
            <p className="font-orbitron font-bold text-xs lg:text-sm">
              {session.user.name}
            </p>
          </CardContent>
          <SignOut />
        </Card>
      </section>
    </Sidebar>
  );
}