"use server"

import { getTotalClass } from "@/app/(main)/inicio/actions"
import { Card } from "../ui/card"
import { Trophy } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"
import { URL_ROUTES } from "@/services/api/routes"

type Props = {}

export async function TotalClasses(props: Props) {
  const response = await getTotalClass()
  return (
    <Card className='w-full border border-card py-4 space-y-4 px-4 flex flex-col space-x-4 mt-2 lg:mt-0 xl:mt-0'>
      <div className='flex space-x-2 justify-center'>
        <h3 className='font-bold text-sm xl:text-base 2xl:text-base font-roboto'>TOTAL CLASES COMPLETADAS: &nbsp; {response?.totalClasses}</h3>
        <Trophy fill='#FFD700' color='#FFD700' size={20} className='xl:mt-0.5 2xl:mt-0.5' />
      </div>
      <Button asChild variant='default' className='bg-highlight mx-auto lg:w-min text-xs xl:text-base 2xl:text-base xl:tracking-wider font-bold'>
        <Link href={URL_ROUTES.HISTORIAL}>ver historial</Link>
      </Button>
    </Card>
  )
}

export default TotalClasses