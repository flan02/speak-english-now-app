import { signOut } from "@/auth"


//type Props = {}

const SignOut = () => {
  const REDIRECT_TO_HOME = process.env.HOME_URL!
  return (
    <form
      action={async () => {
        "use server"
        await signOut({ redirectTo: REDIRECT_TO_HOME })
      }}
    >
      <button type="submit" className="flex space-x-2 text-xs lg:text-sm items-center justify-center mx-auto px-2 py-1.5 tracking-wider font-roboto text-white bg-gray-800 btn-dark rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 transition">
        <span className="mt-0.5 text-xs">
          Cerrar sesion
        </span>
      </button>

    </form>
  )
}

export default SignOut