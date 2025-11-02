'use client'
import { Button } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Reply } from 'lucide-react'
import React, { useEffect, useState } from 'react'

type Props = {
  taskSolved: string
  updatedAt: Date
}

const AnswerSidebar = ({ taskSolved, updatedAt }: Props) => {
  const [open, setOpen] = useState(false)
  const [canView, setCanView] = useState(false)

  useEffect(() => {
    const updatedDate = new Date(updatedAt)
    const diffMs = Date.now() - updatedDate.getTime()
    const diffMin = diffMs / 1000 / 60

    if (diffMin >= 60) {
      setCanView(true)
    } else {
      // enable automatically when an hour has passed
      const remainingMs = (60 - diffMin) * 60 * 1000
      const timer = setTimeout(() => setCanView(true), remainingMs)
      return () => clearTimeout(timer)
    }
  }, [updatedAt])

  const components = {
    p: ({ children }: any) => <span className="inline whitespace-pre-wrap text-sm py-0 my-0">{children}</span>,
    h1: ({ node, ...props }: any) => <h1 {...props} className="text-lg font-bold" />,
    h2: ({ node, ...props }: any) => <h2 {...props} className="text-base font-bold mt-4" />,
    ul: ({ children }: any) => (
      <ul className="text-sm h-min">{children}</ul>
    ),
    li: ({ children }: any) => (
      <li className="h-min">{children}</li>
    ),
  }


  return (
    <div className="absolute top-24 right-8">

      <Button
        disabled={!canView}
        onClick={() => setOpen(true)}
        className="font-bold text-xs dark:bg-gray-100 dark:hover:bg-gray-100/90 dark:text-gray-800 mb-4"
      >
        <Reply />
        <span>Ver Respuestas</span>
      </Button>

      {open && (
        <aside className="border border-card fixed top-36 right-0 rounded-md w-80 h-[calc(100vh-9rem)] bg-white dark:bg-[rgba(50,50,50,0.2)] shadow-lg p-4 overflow-y-auto z-50 transition-transform">
          <button
            onClick={() => setOpen(false)}
            className="text-lg dark:text-red-500 font-bold -mb-12 hover:underline"
          >
            X
          </button>
          <div className="whitespace-pre-wrap text-xs px-0">
            <ReactMarkdown
              components={components}
              remarkPlugins={[remarkGfm]}
            >{taskSolved}</ReactMarkdown>
          </div>

        </aside>
      )}
    </div>


  )
}

export default AnswerSidebar