import { cn } from "@/lib/utils"
import { ReactNode } from "react"


type Props = {}
// ? Receives a className drilled prop and this component needs to wrap childrens (automatically passes as a prop)
const MaxWidthWrapper = ({ className, children }: { className?: string, children: ReactNode }) => {
  return (
    <section className={cn("min-h-screen mx-auto w-full max-w-screen-xl px-2.5 md:px-20 lg:py-24 space-y-16 z-10", className)}>
      {children}
    </section>
  )
}

export default MaxWidthWrapper