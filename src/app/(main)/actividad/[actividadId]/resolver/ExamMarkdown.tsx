'use client'

import React from "react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Props = {
  content: string
}

const ExamMarkdown = ({ content }: Props) => {

  const tokens = content.split(/_{3,}/g);

  const components = {
    p: ({ children }: any) => <span className="inline whitespace-pre-wrap text-sm">{children}</span>,
    a: ({ node, ...props }: any) => <a {...props} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer" />,
    img: ({ node, ...props }: any) => <img {...props} className="max-w-full h-auto mx-auto my-4" />,
    pre: ({ node, ...props }: any) => <pre {...props} className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4" />,
    code: ({ node, ...props }: any) => <code {...props} className="bg-gray-200 px-1 rounded" />,
    h1: ({ node, ...props }: any) => <h1 {...props} className="text-lg xl:text-3xl 2xl:text-3xl font-bold my-4 text-center" />,
    h2: ({ node, ...props }: any) => <h2 {...props} className="text-lg xl:text-xl 2xl:text-xl font-bold mt-10" />,
    ul: ({ children }: any) => (
      <ul className="min-w-[345px] list-disc list-inside my-2">{children}</ul>
    ),
    ol: ({ children }: any) => (
      <ol className="w-min inline-block">{children}</ol>
    ),
    li: ({ children }: any) => (
      <li className="gap-2 leading-relaxed inline-block font-roboto text-sm xl:text-base 2xl:text-base">
        {children}
      </li>),
    // hr: ({ node, ...props }: any) => <hr {...props} className="my-10 border-gray-300 w-[340px] mx-auto" />,
    hr: ({ node, ...props }: any) => null,
    "input-placeholder": () => (
      <input
        type="text"
        className="border-b border-gray-400 focus:outline-none focus:border-blue-500 px-1 mx-1 text-xs inline"
        placeholder="..."
      />
    )
  };

  return (
    <div className="whitespace-pre-line leading-relaxed w-[340px] -ml-1">
      {
        tokens.map((segment, i) => (
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
        ))
      }
    </div>
  )
}

export default ExamMarkdown