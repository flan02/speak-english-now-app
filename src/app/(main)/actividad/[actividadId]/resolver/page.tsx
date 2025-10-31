"use server"
import { completeTask, getTask } from "../../actions";
import ExamMarkdown from "./ExamMarkdown";

interface Props {
  params: {
    actividadId: string
  }
}

const ResolverActividad = async ({ params }: Props) => {
  const resolvedParams = await params;

  const task = await getTask(resolvedParams.actividadId)
  // const parsedContent = task?.content.replace(/_{3,}/g, '<input-placeholder />');

  await completeTask(resolvedParams.actividadId);

  // if (!task) return notFound()
  // const components = {
  //   p: ({ children }: any) => <>{children}</>,
  //   a: ({ node, ...props }: any) => <a {...props} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer" />,
  //   img: ({ node, ...props }: any) => <img {...props} className="max-w-full h-auto mx-auto my-4" />,
  //   pre: ({ node, ...props }: any) => <pre {...props} className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4" />,
  //   code: ({ node, ...props }: any) => <code {...props} className="bg-gray-200 px-1 rounded" />,
  //   h1: ({ node, ...props }: any) => <h1 {...props} className="text-3xl font-bold my-4 text-center" />,
  //   h2: ({ node, ...props }: any) => <h2 {...props} className="text-xl font-bold my-4" />,
  //   hr: ({ node, ...props }: any) => <hr {...props} className="my-10 border-gray-300 w-[340px] mx-auto" />,
  //   "input-placeholder": () => (
  //     <input
  //       type="text"
  //       className="border-b border-gray-400 focus:outline-none focus:border-blue-500 px-1 mx-1 text-sm"
  //       placeholder="..."
  //     />
  //   )
  // };
  return (
    <div className="text-base h-full font-roboto border border-card leading-10 px-8 py-12">
      {/* <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm]}
        skipHtml={false} >
        {parsedContent}
      </ReactMarkdown> */}
      <ExamMarkdown content={task?.content!} />
    </div>
  )
}

export default ResolverActividad