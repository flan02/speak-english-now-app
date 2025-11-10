"use server"
import { getTask, markTaskComplete } from "../../actions";
import ExamMarkdown from "./ExamMarkdown";
import AnswerSidebar from "./AnswerSidebar";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";


interface Props {
  params: Promise<{
    actividadId: string
  }>
}

const ResolverActividad = async ({ params }: Props) => {
  const resolvedParams = await params;

  const task = await getTask(resolvedParams.actividadId)
  await markTaskComplete(resolvedParams.actividadId);

  return (
    <section className="border border-card max-w-6xl mb-8 xl:mb-0 2xl:mb-0 pl-1 py-4 xl:py-8 2xl:py-8 xl:px-12 2xl:px-12 mx-auto space-y-4 rounded-lg">
      <div className="flex justify-end mr-1 xl:mr-8 2xl:mr-8">
        <Link href='/inicio/mis-actividades' className='underline'>
          <ArrowLeftCircle />
        </Link>
      </div>
      <AnswerSidebar taskSolved={task?.solvedContent!} updatedAt={task?.updatedAt!} />
      <ExamMarkdown content={task?.content!} />
    </section>
  )
}

export default ResolverActividad