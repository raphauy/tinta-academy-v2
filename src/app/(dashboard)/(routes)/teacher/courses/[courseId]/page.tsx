import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";

import { updateDescriptionAction, updateTitleAction } from "@/app/(dashboard)/_services/actions";
import { getCourse } from "@/app/(dashboard)/_services/course-service";
import { getCategories } from "@/app/admin/categories/_services/services";
import { Banner } from "@/components/banner";
import { IconBadge } from "@/components/icon-badge";
import { AttachmentForm } from "./_components/attachment-form";
import { CategoryForm } from "./_components/category-form";
import { ChaptersForm } from "./_components/chapters-form";
import { CourseActions } from "./_components/course-actions";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { PriceForm } from "./_components/price-form";
import { TitleForm } from "./_components/title-form";


type Props= {
    params: { courseId: string }
}

async function CourseIdPage({ params }: Props) {

  const course = await getCourse(params.courseId)

  if (!course) redirect("/")

  if (!course) {
    return redirect("/");
  }

  const categories = await getCategories()

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.categoryId,
    course.chapters.some(chapter => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished && (
        <Banner
          label="Este curso no está publicado. No está visible para los estudiantes."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">
              Configuración del curso
            </h1>
            <span className="text-sm text-slate-700">
              Campos completados {completionText}
            </span>
          </div>
          <CourseActions
            disabled={!isComplete}
            courseId={params.courseId}
            title={course.title}
            isPublished={course.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">
                Personalización
              </h2>
            </div>
            <TitleForm
              initialData={course}
              id={course.id}
              update={updateTitleAction}
            />
            <DescriptionForm
                initialData={course}
                id={course.id}
                update={updateDescriptionAction}
            />
            <ImageForm
              initialData={course}
              courseId={course.id}
            />
            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">
                  Capítulos
                </h2>
              </div>
              <ChaptersForm
                initialData={course}
                courseId={course.id}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">
                  Monetización
                </h2>
              </div>
              <PriceForm
                initialData={course}
                courseId={course.id}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">
                  Material complementario
                </h2>
              </div>
              <AttachmentForm
                initialData={course}
                courseId={course.id}
              />
            </div>
          </div> 
        </div>
      </div>
    </>
   );
}
 
export default CourseIdPage;