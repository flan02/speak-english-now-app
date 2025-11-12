"use server"
import { ArrowLeftCircle } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getTask } from "../actions"
import { URL_ROUTES } from "@/services/api/routes"
import { translateDifficulty, translateType } from "@/lib/utils"



interface Props {
  params: Promise<{
    actividadId: string
  }>
}

type MarkdownComponents = {
  children: React.ReactNode;
}

const ActividadPage = async ({ params }: Props) => {
  const resolvedParams = await params;

  const task = await getTask(resolvedParams.actividadId)
  if (!task) return notFound()

  const components: Record<string, React.ComponentType<any>> = {
    // Tablas
    table: ({ children }: MarkdownComponents) => (
      <table className="w-full border-collapse my-4 rounded-lg overflow-hidden shadow-sm">
        {children}
      </table>
    ),
    thead: ({ children }: MarkdownComponents) => (
      <thead className="bg-yellow-50 dark:bg-black/30 text-gray-900 dark:text-gray-100">
        {children}
      </thead>
    ),
    th: ({ children }: MarkdownComponents) => (
      <th className="text-left font-semibold px-4 py-2 border-b border-gray-300 dark:border-gray-700">
        {children}
      </th>
    ),
    tbody: ({ children }: MarkdownComponents) => <tbody>{children}</tbody>,
    tr: ({ children }: MarkdownComponents) => (
      <tr className="">
        {children}
      </tr>
    ),
    td: ({ children }: MarkdownComponents) => (
      <td className="p-4 text-xs xl:text-sm 2xl:text-sm border-b border-gray-200 dark:border-gray-700">
        {children}
      </td>
    ),

    // Código inline y bloques
    code: ({ children }: MarkdownComponents) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-[13px] font-mono">
        {children}
      </code>
    ),
    pre: ({ children }: MarkdownComponents) => (
      <pre className="bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto text-sm my-3">
        {children}
      </pre>
    ),
  }

  return (
    <section className="border border-card max-w-6xl mb-8 xl:mb-0 2xl:mb-0 px-2 py-4 xl:py-8 2xl:py-8 xl:px-12 2xl:px-12 mx-1 space-y-4 rounded-lg">
      <div className="flex justify-end mr-1 xl:mr-8 2xl:mr-8">
        <Link href={URL_ROUTES.ACTIVIDADES} className='underline'>
          <ArrowLeftCircle />
        </Link>
      </div>

      <article className="h-full xl:h-[750px] 2xl:h-[750px] space-y-12 xl:space-y-6 2xl:space-y-6">
        <h1 className="text-xl xl:text-3xl 2xl:text-3xl font-bold text-center underline underline-offset-4">Actividad: {task.title}</h1>
        <div className="space-y-5">
          <p className="font-roboto text-lg font-bold underline underline-offset-4">Instrucciones: </p>
          <p className="font-roboto text-sm xl:text-base 2xl:text-base px-2 xl:px-4 2xl:px-4">Estas por entrar a resolver la actividad, podes completarla cuando vos quieras y todas las veces que necesites. A los 90 minutos despues de iniciada la actividad tendras acceso a un documentos con las resolucion correcta para que puedas comparar tus respuestas</p>
          <p className="font-roboto text-lg font-bold underline underline-offset-4">Descripciones: </p>
          <div className="text-lg font-roboto px-4">
            <ReactMarkdown
              components={components}
              remarkPlugins={[remarkGfm]}
            >
              {task.description}
            </ReactMarkdown>
          </div>
          <div className="flex">
            <p className="font-roboto text-lg font-bold underline underline-offset-4">Dificultad:</p>
            <p className="text-base xl:text-lg mt-1 lg:mt-0 font-roboto px-4 capitalize -ml-1">{translateDifficulty(task.difficulty)}</p>
          </div>
          <div className="flex">
            <p className="font-roboto text-lg font-bold underline underline-offset-4">Tipo:</p>
            <p className="text-base xl:text-lg mt-1 lg:mt-0 font-roboto px-4 capitalize -ml-1">{translateType(task.type)}</p>
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <a
            href={`/actividad/${task.id}/resolver`}
            className="bg-highlight dark:hover:bg-gray-200/90 py-2 px-6 rounded-lg text-xs tracking-wide"
          >
            Comenzar actividad
          </a>
        </div>
      </article>
    </section>
  );
}

export default ActividadPage