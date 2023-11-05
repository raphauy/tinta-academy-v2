import { redirect } from "next/navigation";


import { getUserProgressCourse } from "@/app/(dashboard)/_services/course-service";
import { getProgress } from "@/app/(dashboard)/_services/get-progress";
import { getCurrentUser } from "@/lib/auth";
import { CourseNavbar } from "./_components/course-navbar";
import { CourseSidebar } from "./_components/course-sidebar";

type Props = {
  children: React.ReactNode;
  params: { courseId: string };
};

async function CourseLayout({ children, params }: Props) {
  const user= await getCurrentUser()
  const userId = user?.id

  if (!userId) {
    return redirect("/login")
  }

  const course= await getUserProgressCourse(userId, params.courseId)

  if (!course) {
    return redirect("/");
  }

  const progressCount = await getProgress(userId, course.id);

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
        />
      </div>
      <main className="md:pl-80 pt-[80px] h-full">
        {children}
      </main>
    </div>
  )
}

export default CourseLayout