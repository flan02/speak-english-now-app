"use server"
import { ArrowLeftCircle } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import React from 'react'
import { completeTask, getResponse, getTask } from "../actions"
import { Button } from "@/components/ui/button"


interface Props {
  params: {
    actividadId: string
  }
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
      <td className="p-4 text-sm border-b border-gray-200 dark:border-gray-700">
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
    <section className=" max-w-6xl py-8 px-12 mx-auto space-y-4 border border-card rounded-lg">
      <form action={getResponse}>
        <input type="hidden" name="taskId" value={task.id} />
        <Button type="submit">Respuestas</Button>
      </form>
      <div className="flex justify-end mr-8">
        <Link href='/inicio/mis-actividades' className='underline'>
          <ArrowLeftCircle />
        </Link>
      </div>
      <br />
      <article className="h-[750px] space-y-6">
        <h1 className="text-4xl font-bold text-center underline underline-offset-4">Actividad: {task.title}</h1>
        <div className="space-y-5">
          <p className="font-roboto text-lg font-bold underline underline-offset-4">Instrucciones: </p>
          <p className="font-roboto text-base px-4">Estas por entrar a resolver la actividad, podes completarla cuando vos quieras y todas las veces que necesites. A los 90 minutos despues de iniciada la actividad tendras acceso a un documentos con las resolucion correcta para que puedas comparar tus respuestas</p>
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
            <p className="text-lg font-roboto px-4 capitalize -ml-1">{task.difficulty}</p>
          </div>
          <div className="flex">
            <p className="font-roboto text-lg font-bold underline underline-offset-4">Tipo:</p>
            <p className="text-lg font-roboto px-4 capitalize -ml-1">{task.type}</p>
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <a
            href={`/actividad/${task.id}/resolver`}
            className="bg-black hover:bg-black/80 text-white dark:text-black dark:bg-gray-200 dark:hover:bg-gray-200/90 py-2 px-6 rounded-lg text-xs tracking-wide"
          >
            Comenzar actividad
          </a>
        </div>
      </article>
    </section>
  );
}

export default ActividadPage