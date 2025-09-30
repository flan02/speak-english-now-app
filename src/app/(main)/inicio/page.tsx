// app/inicio/page.tsx
import { redirect } from "next/navigation";




import { Metadata } from "next";
import CreateResumeButton from "./CreateResumeButton";
import ResumeItem from "./ResumeItem";
import { auth } from "@/auth";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";



export const metadata: Metadata = {
  title: "Tus curriculums"
}

export default async function Inicio() {

  const session = await auth()
  //console.log(session)

  if (!session?.user?.id) {
    return <p>Error</p>
  }


  console.log("session.user", session.user);

  return redirect("/inicio/principal");


}