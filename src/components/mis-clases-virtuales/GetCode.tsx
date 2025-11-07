'use client'
import { Input } from "../ui/input"
import { ExternalLink } from "lucide-react"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { KY, Method } from "@/services/api"


type Props = {}

const GetCode = (props: Props) => {
  const [accessCode, setAccessCode] = useState<string>("")
  const [error, setError] = useState<string>("")

  const handleAccessCode = async (accessCode: string) => {
    //console.log('AccessCode in our frontend', accessCode);
    try {
      const response = await KY(Method.POST, 'http://localhost:3000/api/access-code', { json: accessCode })
      const data = await response.json();

      //console.log("Google link obtained", data);
      if (data.response.message) {
        setError(data.response.message);
      }
      else {
        window.open(data.response.htmlLink, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      console.error("Error fetching access code:", error);
    }
  }

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);


  return (
    <div className='flex flex-col xl:flex-row xl:items-center 2xl:flex-row 2xl:items-center px-2 xl:px-0 2xl:px-0 space-x-2 space-y-2 xl:space-y-0 2xl:space-y-0'>
      <p className='font-roboto text-sm'>Unirme a una clase como invitado:</p>
      <Input
        value={accessCode}
        onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
        className='w-[145px] xl:w-[120px] 2xl:w-[120px] font-bold text-lg uppercase'
        maxLength={8}
        placeholder='CODIGO' />
      <Button
        disabled={accessCode.length < 8}
        onClick={() => handleAccessCode(accessCode)}
        className='bg-black text-white dark:bg-white dark:text-black tracking-wider text-sm'>
        <ExternalLink />
      </Button>
      {
        error && <p className="text-red-500 text-xs ml-4">{error}</p>
      }
    </div>

  )
}

export default GetCode