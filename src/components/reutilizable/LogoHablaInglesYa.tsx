import { LanguagesIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const LogoHablaInglesYa = (props: Props) => {
  return (
    <div className="flex items-end space-x-4">
      <div className="w-full flex items-end">
        <LanguagesIcon className="pr-2 text-purple-500/70 size-20" />
        <h1 className="text-3xl lg:text-5xl font-bold text-lime-950">HABLA</h1>
        <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">INGLES</h1>
        <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">YA</h1>
      </div>
    </div>
  )
}

export default LogoHablaInglesYa