"use server"
import { completeTask, getTask } from "../../actions";
import ExamMarkdown from "./ExamMarkdown";

import AnswerSidebar from "./AnswerSidebar";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";

interface Props {
  params: {
    actividadId: string
  }
}

const ResolverActividad = async ({ params }: Props) => {
  const resolvedParams = await params;

  const task = await getTask(resolvedParams.actividadId)


  await completeTask(resolvedParams.actividadId);


  return (
    <div className="text-base h-full font-roboto border border-card leading-10 px-8 py-12 rounded-md">
      <div className="flex justify-end mr-8">
        <Link href='/inicio/mis-actividades' className='underline'>
          <ArrowLeftCircle />
        </Link>
      </div>
      <AnswerSidebar taskSolved={task?.solvedContent!} updatedAt={task?.updatedAt!} />
      <ExamMarkdown content={task?.content!} />
    </div>
  )
}

export default ResolverActividad