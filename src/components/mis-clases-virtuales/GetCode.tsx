'use client'
import { Input } from "../ui/input"
import { ExternalLink } from "lucide-react"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { handleAccessCode } from "@/services/api/clients"


type Props = {}

const GetCode = (props: Props) => {

  const [accessCode, setAccessCode] = useState<string>("")
  const [error, setError] = useState<string>("")

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className='flex flex-col xl:flex-row xl:items-center 2xl:flex-row 2xl:items-center px-4 xl:px-0 2xl:px-0 space-x-2 space-y-2 xl:space-y-0 2xl:space-y-0'>
      <p className='font-roboto text-sm'>Unirme a una clase como invitado:</p>
      <div className="space-x-2 flex items-end">
        <Input
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
          className='w-[145px] xl:w-[140px] 2xl:w-[140px] font-bold uppercase text-base xl:text-base 2xl:text-base'
          maxLength={8}
          placeholder='CODIGO' />
        <Button
          disabled={accessCode.length < 8}
          onClick={() => handleAccessCode(accessCode, setError)}
          className='bg-highlight tracking-wider text-sm'>
          <ExternalLink />
        </Button>
      </div>
      {
        error && <p className="text-red-500 text-xs ml-4">{error}</p>
      }
    </div>

  )
}

export default GetCode

