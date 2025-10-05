
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
} from "@/components/ui/sidebar"
import { items } from "@/lib/types"
import { Card, CardContent, CardTitle } from "./card"
import SignIn from "../reutilizable/sign-in"
import { auth } from "@/auth"
import SignOut from "../reutilizable/sign-out"
import Image from "next/image"
import { userAgent } from "next/server"
import { Dot } from "lucide-react"




export async function AppSidebar() {
  const session = await auth()
  const image = session?.user?.image! || null

  console.log('user image sidebar:', image);
  //console.log(session?.user.id)
  if (!session?.user?.name) {
    return <SignIn />
  }
  return (
    <Sidebar className="lg:absolute lg:top-2 lg:left-0 lg:h-[768px] lg:w-[250px] lg:z-30 lg:mt-24 border-r border-r-gray-200 dark:border-r dark:border-r-gray-600/30">
      <SidebarContent className="min-w-[340px]">
        <SidebarGroup>
          <SidebarGroupLabel>
            <span className="hidden lg:block lg:mb-4">Menu</span>
            <SidebarTrigger className="lg:hidden absolute right-2 top-2" />

          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-6 lg:space-y-1 mt-4 w-min mx-auto lg:mt-0 lg:w-full lg:mx-0">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="text-left">
                  <SidebarMenuButton asChild className="lg:w-[240px] hover:text-white hover:bg-black dark:hover:bg-white dark:hover:text-black font-roboto">
                    <a href={item.url} className="">
                      <item.icon className="" />
                      <span className="lg:text-lg text-xl tracking-wide">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <section>
        <Card className="border-card px-1 py-2 mx-1">

          <CardContent className="flex items-center relative">
            <Dot color="green" size={52} fill="" className="absolute top-1 left-0" />
            <Image src={session.user.image!} alt={session.user.name} width={32} height={32} className="rounded-full mr-2 border-2 border-black" />
            <p className="font-orbitron font-bold">{session.user.name}</p>
          </CardContent>

          <SignOut />

        </Card>
      </section>
    </Sidebar>
  )
}