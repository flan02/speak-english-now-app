import { signOut } from "@/auth"
import { LogOut } from "lucide-react"

const SignOut = () => {
  const REDIRECT_TO_HOME = process.env.BASE_URL
  return (
    <form
      action={async () => {
        "use server"
        await signOut({ redirectTo: REDIRECT_TO_HOME })
      }}
    >
      <button type="submit" className="flex mb-8 lg:mb-0 space-x-2 text-xs lg:text-sm items-center justify-center mx-auto px-2 py-1.5 tracking-wider font-roboto text-white bg-gray-800 btn-dark rounded-md hover:bg-gray-700">
        <span className="mt-0.5 text-[10px]">
          Cerrar sesion
        </span>
        <LogOut size={12} />
      </button>

    </form>
  )
}

export default SignOut