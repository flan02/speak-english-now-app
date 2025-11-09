import { redirect } from "next/navigation";
import { Metadata } from "next";
import { auth } from "@/auth";




export const metadata: Metadata = {
  title: "Tus clases virtuales"
}

export default async function Inicio() {

  const session = await auth()

  if (!session?.user?.id) {
    return <p>Error</p>
  }

  return redirect("/inicio/principal");


}