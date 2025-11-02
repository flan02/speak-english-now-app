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


  await completeTask(resolvedParams.actividadId);


  return (
    <div className="text-base h-full font-roboto border border-card leading-10 px-8 py-12 rounded-md">
      <ExamMarkdown content={task?.content!} />
    </div>
  )
}

export default ResolverActividad