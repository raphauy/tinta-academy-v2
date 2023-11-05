import { redirect } from "next/navigation";
import { File } from "lucide-react";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { getChapter } from "@/app/(dashboard)/_services/get-chapter";
import { VideoPlayer } from "@/app/(course)/courses/[courseId]/chapters/[chapterId]/_components/video-player";
import { CourseProgressButton } from "@/app/(course)/courses/[courseId]/chapters/[chapterId]/_components/course-progress-button";
import { CourseEnrollButton } from "@/app/(course)/courses/[courseId]/chapters/[chapterId]/_components/course-enroll-button";
import { tr } from "date-fns/locale";
import { ConfirmModal } from "@/components/confirm-modal";
import { Button } from "@/components/ui/button";
import EnrollPreviewButton from "./enroll-preview-button";

type Props = {
  params: {
    courseId: string;
    chapterId: string;
  }
}

export default async function ChapterPage({ params }: Props) {

  const userId= "preview"

  const { chapter, course, muxData, attachments, nextChapter, userProgress, purchase } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  })

  if (!chapter || !course) {
    return redirect("/")
  }


  const isLocked = !chapter.isFree && !purchase
  const completeOnEnd = !!purchase && !userProgress?.isCompleted

  return ( 
    <div>
      {isLocked && (
        <Banner
          variant="warning"
          label="Tienes que inscribirte a este curso para ver este capítulo."
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
            preview={true}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">
              {chapter.title}
            </h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <EnrollPreviewButton price={course.price} />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a target="_blank"
                    href={attachment.url}                    
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
   );
}
 
