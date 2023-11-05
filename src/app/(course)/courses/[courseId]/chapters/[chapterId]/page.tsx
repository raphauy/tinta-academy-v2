import { redirect } from "next/navigation";
import { File } from "lucide-react";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { CourseProgressButton } from "./_components/course-progress-button";
import { getCurrentUser } from "@/lib/auth";
import { getChapter } from "@/app/(dashboard)/_services/get-chapter";

type Props = {
  params: {
    courseId: string;
    chapterId: string;
  }
}

export default async function ChapterPage({ params }: Props) {
  const currentUser = await getCurrentUser()
  const userId = currentUser?.id

  console.log("userId", userId);
  
  
  if (!userId) return redirect("/login")

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
      {userProgress?.isCompleted && (
        <Banner
          variant="success"
          label="Ya has completado este capítulo."
        />
      )}
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
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
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
 
