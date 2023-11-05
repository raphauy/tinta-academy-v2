import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Banner } from "@/components/banner";
import { IconBadge } from "@/components/icon-badge";

import { updateChapterDescriptionAction, updateChapterIsFreeAction, updateChapterTitleAction, updateChapterVideoUrlAction } from "@/app/(dashboard)/_services/actions";
import { getChapter } from "@/app/(dashboard)/_services/chapter-service";
import { getCurrentUser } from "@/lib/auth";
import { DescriptionRichTextForm } from "../../_components/description-rich-text-form";
import { TitleForm } from "../../_components/title-form";
import { ChapterAccessForm } from "./_components/chapter-access-form";
import { ChapterActionsForm } from "./_components/chapter-actions-form";
import { ChapterVideoForm } from "./_components/chapter-video-form";

type Props = {
  params: { courseId: string; chapterId: string };
}

export default async function ChapterPage({ params }: Props) {

  const user= await getCurrentUser()
  const userId= user?.id

  if (!userId) {
    return redirect("/");
  }

  const chapter = await getChapter(params.chapterId)

  if (!chapter) {
    return redirect("/")
  }

  const requiredFields = [
    chapter.title,
    chapter.description,
    chapter.videoUrl,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="Este capítulo no está publicado. No será visible en el curso"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al curso
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">
                  {chapter.title}
                </h1>
                <span className="text-sm text-slate-700">
                  Campos completados {completionText}
                </span>
              </div>
              <ChapterActionsForm
                initialData={chapter}
                id={chapter.id}
                disabled={!isComplete}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">
                  Personalización del capítulo
                </h2>
              </div>
              <TitleForm
                initialData={chapter}
                id={chapter.id}
                update={updateChapterTitleAction}
              />
              <DescriptionRichTextForm
                  initialData={chapter}
                  id={chapter.id}
                  update={updateChapterDescriptionAction}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">
                  Configuración de acceso
                </h2>
              </div>
              <ChapterAccessForm
                initialData={chapter}
                id={chapter.id}
                update={updateChapterIsFreeAction}
              />              
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">
                Agregar video
              </h2>
            </div>
            <ChapterVideoForm
              initialData={chapter}
              id={chapter.id}
              update={updateChapterVideoUrlAction}
            />
          </div>
        </div>
      </div>
    </>
   );
}
 
