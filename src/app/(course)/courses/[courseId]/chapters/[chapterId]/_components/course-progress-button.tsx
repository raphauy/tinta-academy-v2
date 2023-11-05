"use client";

import axios from "axios";
import { CheckCircle, Loader, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { progressAction } from "@/app/(dashboard)/_services/actions";
import { toast } from "@/components/ui/use-toast";

interface CourseProgressButtonProps {
  chapterId: string;
  courseId: string;
  isCompleted?: boolean;
  nextChapterId?: string;
};

export const CourseProgressButton = ({
  chapterId,
  courseId,
  isCompleted,
  nextChapterId
}: CourseProgressButtonProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {

    progressAction(!isCompleted, chapterId)
    .then((res) => {
      if (!isCompleted && !nextChapterId) {
        confetti.onOpen();
      }

      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      toast({ title: "Progreso actualizado"})
//      router.refresh();
    })
    .catch((error) => {
      toast({ title: `Algo salió mal ${error.message}`})
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const Icon = isCompleted ? XCircle : CheckCircle

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      variant={isCompleted ? "outline" : "success"}
      className="w-full md:w-auto"
    >
      {isCompleted ? "No completado" : "Completado"}
      {isLoading ? <Loader className="h-4 w-4 ml-2 animate-spin" /> : <Icon className="h-4 w-4 ml-2" />}
    </Button>
  )
}