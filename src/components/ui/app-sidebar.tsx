
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




export function AppSidebar() {

  return (
    <Sidebar className="lg:absolute lg:top-2 lg:left-0 lg:h-[768px] lg:w-[250px] lg:z-50 lg:mt-24 border-r border-r-gray-200 dark:border-r dark:border-r-gray-600/30">
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
    </Sidebar>
  )
}