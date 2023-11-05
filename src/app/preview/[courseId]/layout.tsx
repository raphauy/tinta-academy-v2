import { redirect } from "next/navigation";


import { getPreviewProgressCourse } from "@/app/(dashboard)/_services/course-service";
import { CourseNavbar } from "../../(course)/courses/[courseId]/_components/course-navbar";
import { CourseSidebar } from "../../(course)/courses/[courseId]/_components/course-sidebar";

type Props = {
  children: React.ReactNode;
  params: { courseId: string };
};

async function CourseLayout({ children, params }: Props) {

  const course= await getPreviewProgressCourse(params.courseId)

  if (!course) {
    return redirect("/");
  }

  const progressCount = 0

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar
          course={course}
          progressCount={progressCount}
        />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <CourseSidebar
          course={course}
          progressCount={progressCount}
          preview
        />
      </div>
      <main className="md:pl-80 pt-[80px] h-full">
        {children}
      </main>
    </div>
  )
}

export default CourseLayout