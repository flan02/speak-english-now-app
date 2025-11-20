import Navbar from "./Navbar";
import { auth } from "@/auth";
import SignIn from "@/components/reutilizable/sign-in";
import Marquee from "@/components/reutilizable/Marquee";
import { marquee_banners } from "@/lib/types";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import MaxWidthWrapper from "@/components/reutilizable/MaxWidthWrapper";
import ClientTabGuard from "@/components/reutilizable/ClientTabGuard";
import AuthTabSync from "@/components/reutilizable/AuthTabSync";


export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session?.user?.name) {
    return <SignIn />
  }

  return (
    <>
      {
        session.user.name &&
        <>

          <ClientTabGuard />
          <Marquee time={30} banners={marquee_banners} />
          <Navbar />
          {/* <BackgroundMultiDots /> */}
          <SidebarProvider className="">
            <AppSidebar />
            <MaxWidthWrapper className="min-w-[350px] xl:max-w-5xl 2xl:max-w-7xl px-0 mx-0 xl:mx-auto 2xl:mx-auto lg:px-4 lg:py-12 space-y-4 xl:space-y-8 2xl:space-y-8"> {/* added: px-0 mx-0 */}
              <SidebarTrigger className="top-12 right-4 lg:hidden fixed bg-highlight" />
              {children}
            </MaxWidthWrapper>
          </SidebarProvider>
        </>
      }
    </>
  )
}


