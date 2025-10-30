import { db } from "@/db";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Props {
  params: {
    actividadId: string
  }
}

const ResolverActividad = async ({ params }: Props) => {
  const resolvedParams = await params;

  const task = await db.task.findUnique({
    where: {
      id: resolvedParams.actividadId
    },
    select: {
      content: true,
      solvedContent: true,
    }
  })

  if (!task) return notFound()
  const components = {
    a: ({ node, ...props }: any) => <a {...props} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer" />,
    img: ({ node, ...props }: any) => <img {...props} className="max-w-full h-auto mx-auto my-4" />,
    pre: ({ node, ...props }: any) => <pre {...props} className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4" />,
    code: ({ node, ...props }: any) => <code {...props} className="bg-gray-200 px-1 rounded" />,
    h1: ({ node, ...props }: any) => <h1 {...props} className="text-3xl font-bold my-4 text-center" />,
  };
  return (
    <div className="text-lg h-full font-roboto border border-card leading-10 px-8 py-12">
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm]}>{task.content}</ReactMarkdown>
    </div>
  )
}

export default ResolverActividad