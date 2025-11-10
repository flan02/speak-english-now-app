'use client'
import { Copy } from "lucide-react";
import { useState } from "react";


type Props = {
  code: string
  classType: 'individual' | 'grupal'
}


const AccessCode = ({ code, classType }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // vuelve a estado normal
    } catch (err) {
      console.error("Error copying text:", err);
    }
  };
  return (
    <div className='w-[100px] lg:w-[90px] xl:w-[90px] 2xl:w-[90px] flex relative justify-between items-center'>
      {
        classType === 'grupal'
          ?
          <>
            <p
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()} >
              {code}
            </p>
            <button onClick={handleCopy}>
              <Copy size={12} className='mt-0.5 lg:mt-0 xl:mt-0 2xl:mt-0' />
              {copied && (
                <span className="text-xs text-gray-500 absolute mt-1.5 -ml-12">¡Copiado!</span>
              )}
            </button>
          </>
          : <p></p>
      }
    </div>
  )
}

export default AccessCode