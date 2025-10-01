import BackgroundMultiDots from "@/components/reutilizable/BackgroundMultiDots";

import Navbar from "./Navbar";
import { auth } from "@/auth";
import SignIn from "@/components/reutilizable/sign-in";
import Marquee from "@/components/reutilizable/Marquee";
import { marquee_banners } from "@/lib/types";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import MaxWidthWrapper from "@/components/reutilizable/MaxWidthWrapper";


export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  //console.log(session?.user.id)
  if (!session?.user?.name) {
    return <SignIn />
  }

  return (

    <>
      {
        session.user.name &&
        <>
          <Marquee time={30} banners={marquee_banners} />
          <Navbar />
          {/* <BackgroundMultiDots /> */}
          <SidebarProvider className="">
            <AppSidebar />
            <MaxWidthWrapper className="max-w-7xl md:px-0 lg:py-2">
              <SidebarTrigger className="lg:hidden fixed right-2" />
              <MaxWidthWrapper className="lg:px-4 lg:py-12">
                {children}
              </MaxWidthWrapper>

            </MaxWidthWrapper>

          </SidebarProvider>
        </>
      }
    </>

  )
}


