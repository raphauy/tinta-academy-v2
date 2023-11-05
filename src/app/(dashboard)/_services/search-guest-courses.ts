import { Category, Course } from "@prisma/client";

import { prisma } from "@/lib/db";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  title?: string;
  categoryId?: string;
};

export async function searchGuestCourses({ title, categoryId }: GetCourses): Promise<CourseWithProgressWithCategory[]> {
  try {
    const courses = await prisma.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          }
        },
      },
      orderBy: {
        createdAt: "desc",
      }
    });

    const coursesWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
      courses.map(async course => {
        return {
          ...course,
          progress: null,
        }
      })
    );

    return coursesWithProgress;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
}