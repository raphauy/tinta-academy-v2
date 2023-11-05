import { getPublishedCourse } from "@/app/(dashboard)/_services/course-service";
import { redirect } from "next/navigation";

type Props = {
  params: {
    courseId: string;
  }
}

export default async function CoursePage({ params }: Props) {
  const course = await getPublishedCourse(params.courseId)

  if (!course) {
    return redirect("/");
  }

  return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
}
 
