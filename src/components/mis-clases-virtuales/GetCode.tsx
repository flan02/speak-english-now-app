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
    console.log('AccessCode in our frontend', accessCode);
    try {
      const response = await KY(Method.POST, 'http://localhost:3000/api/access-code', { json: accessCode })
      const data = await response.json();

      console.log("Google link obtained", data);
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
    <div className='flex items-center space-x-2'>
      <p className='font-roboto text-sm'>Unirme a una clase como invitado:</p>
      <Input
        value={accessCode}
        onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
        className='w-[120px] font-bold text-lg uppercase'
        maxLength={8}
        placeholder='CODIGO' />
      <Button
        disabled={accessCode.length < 8}
        onClick={() => handleAccessCode(accessCode)}
        className='bg-black text-white dark:bg-white dark:text-black tracking-wider text-sm'>
        <ExternalLink />
      </Button>
      {error && <p className="text-red-500 text-xs ml-4">{error}</p>}
    </div>

  )
}

export default GetCode