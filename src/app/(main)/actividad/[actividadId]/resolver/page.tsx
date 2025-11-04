"use server"
import { completedClass, completeTask, getTask } from "../../actions";
import ExamMarkdown from "./ExamMarkdown";

import AnswerSidebar from "./AnswerSidebar";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { db } from "@/db";

interface Props {
  params: {
    actividadId: string
  }
}

const ResolverActividad = async ({ params }: Props) => {
  const resolvedParams = await params;

  const task = await getTask(resolvedParams.actividadId)

  const response = await db.userActivity.findFirst({
    where: {
      taskId: resolvedParams.actividadId
    },
    select: {
      id: true,
      completed: true
    }
  })

  if (response?.completed == false) {
    console.log('Actividad completada correctamente.');
    await completeTask(resolvedParams.actividadId);
    await completedClass()
  } else {
    console.log('La actividad ya estaba completada.');
  }


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