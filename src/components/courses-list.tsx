import { Category, Course } from "@prisma/client";

import { CourseCard } from "@/components/course-card";
import { cn } from "@/lib/utils";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
  preview?: boolean;
}

export function CoursesList({ items, preview }: CoursesListProps) {

  const flex= "md:flex"

  return (
    <div>
      <div className={cn(items.length < 5 && flex, "grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4")} >
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            progress={item.progress}
            category={item?.category?.name!}
            preview={preview}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No se encontraron cursos
        </div>
      )}
    </div>
  )
}