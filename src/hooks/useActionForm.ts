import { useActionState, useEffect, useState } from "react"

export function useActionForm<T extends (...args: any[]) => Promise<{ message: string } | undefined>>(action: T, initialMessage = "") {
  const [state, formAction, pending] = useActionState(action as any, { message: initialMessage })
  const [message, setMessage] = useState(initialMessage)

  useEffect(() => {
    if (state?.message) {
      setMessage(state.message)

      const timeout = setTimeout(() => {
        setMessage("")
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [state?.message])

  return {
    formAction, // para el <form action={formAction}>
    message, // texto visible en pantalla
    pending, // estado de carga
    resetMessage: () => setMessage(""),
  }
}
