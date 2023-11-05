import { Chapter, Course, UserProgress } from "@prisma/client"
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import { CourseProgress } from "@/components/course-progress";

import { CourseSidebarItem } from "./course-sidebar-item";
import { getCurrentUser } from "@/lib/auth";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[]
  };
  progressCount: number;
  preview?: boolean;
};

export async function CourseSidebar({ course, progressCount, preview }: CourseSidebarProps) {
  const currentUser = await getCurrentUser()
  const userId = currentUser?.id

  const purchase = await prisma.purchase.findUnique({
    where: {
      userId_courseId: {
        userId: userId || "preview",
        courseId: course.id,
      }
    }
  });

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">
          {course.title}
        </h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress
              variant="success"
              value={progressCount}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
            preview={preview}
          />
        ))}
      </div>
    </div>
  )
}