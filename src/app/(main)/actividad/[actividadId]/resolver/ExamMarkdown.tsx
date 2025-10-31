'use client'

import React from "react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Props = {
  content: string
}

const ExamMarkdown = ({ content }: Props) => {

  const tokens = content.split(/(__{3,})/g);

  const components = {
    // p: ({ children }: any) => <>{children}</>,
    p: ({ children }: any) => <span className="inline">{children}</span>,
    a: ({ node, ...props }: any) => <a {...props} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer" />,
    img: ({ node, ...props }: any) => <img {...props} className="max-w-full h-auto mx-auto my-4" />,
    pre: ({ node, ...props }: any) => <pre {...props} className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4" />,
    code: ({ node, ...props }: any) => <code {...props} className="bg-gray-200 px-1 rounded" />,
    h1: ({ node, ...props }: any) => <h1 {...props} className="text-3xl font-bold my-4 text-center" />,
    h2: ({ node, ...props }: any) => <h2 {...props} className="text-xl font-bold my-4" />,
    // hr: ({ node, ...props }: any) => <hr {...props} className="my-10 border-gray-300 w-[340px] mx-auto" />,
    hr: ({ node, ...props }: any) => null,
    "input-placeholder": () => (
      <input
        type="text"
        className="border-b border-gray-400 focus:outline-none focus:border-blue-500 px-1 mx-1 text-sm"
        placeholder="..."
      />
    )
  };
  return (
    <div>
      {tokens.map((segment, i) => (
        <React.Fragment key={i}>
          <ReactMarkdown
            components={components}
            remarkPlugins={[remarkGfm]}
          >
            {segment}
          </ReactMarkdown>
          {i < tokens.length - 1 && (
            <input
              type="text"
              className="border-b border-gray-400 focus:outline-none focus:border-blue-500 px-1 mx-1 text-sm"
              placeholder="..."
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default ExamMarkdown