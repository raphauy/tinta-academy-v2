"use client";

import { progressAction } from "@/app/(dashboard)/_services/actions";
import { toast } from "@/components/ui/use-toast";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface VideoPlayerProps {
  playbackId: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
  preview?: boolean;
};

export function VideoPlayer({ playbackId, courseId, chapterId, nextChapterId, isLocked, completeOnEnd, title,preview }: VideoPlayerProps) {

  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  const onEnd = async () => {
    progressAction(true, chapterId)
    .then(() => {
      if (!nextChapterId && !preview) {
        confetti.onOpen();
      }
      toast({ title: "Progreso actualizado"})
      //router.refresh();
      if (nextChapterId) {
        if (preview)
          router.push(`/preview/${courseId}/chapters/${nextChapterId}`)
        else
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
      }
    })
    .catch((error) => {
      toast({ title: `Algo salió mal: ${error.message}`})
    })
  }

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">
            Este capítulo está bloqueado.
          </p>
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(!isReady && "hidden")}
          onCanPlay={() => setIsReady(true)}
          onEnded={onEnd}
          autoPlay
          playbackId={playbackId}
        />
      )}
    </div>
  )
}