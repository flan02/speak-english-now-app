import { signIn } from "@/auth"
import GoogleWrapButton from "./GoogleWrapButton"


export default function SignIn() {
  return (
    <div className="mx-auto w-[200px] lg:w-[250px]">
      <GoogleWrapButton />
      <form
        action={async () => {
          "use server"
          await signIn("github", { callbackUrl: "/inicio" })
        }}
      >
      </form>
    </div>
  )
} 