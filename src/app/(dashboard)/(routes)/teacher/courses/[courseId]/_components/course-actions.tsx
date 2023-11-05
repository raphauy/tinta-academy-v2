"use client";

import { Loader, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { eliminateAction, publishAction, unpublishAction } from "@/app/(dashboard)/_services/actions";
import { ConfirmModal } from "@/components/confirm-modal";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  title: string;
  isPublished: boolean;
};

export function CourseActions({ disabled, courseId, title, isPublished }: ActionsProps) {

  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {

    setIsLoading(true);

    if (isPublished) {
      unpublishAction(courseId)
      .then(() => {
        toast({title: "Curso despublicado"});
      })
      .catch(() => {
        toast({title: "Algo salió mal"});
      })
      
    } else {
      publishAction(courseId)
      .then(() => {
        toast({title: "Curso publicado"});
      })        
      confetti.onOpen();
    }

    router.refresh();
    setIsLoading(false);
  }
  
  const onDelete = async () => {
    setIsLoading(true);

    eliminateAction(courseId)
    .then(() => {
      toast({title: "Curso eliminado"});
      router.refresh();
      router.push(`/teacher/courses`);
    })
    .catch((error) => {
      toast({title: `Algo salió mal (${error.message})`});
    })
    .finally(() => {
      setIsLoading(false);
    })
  }


  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal 
        onConfirm={onDelete}
        title="Eliminar curso"
        description={`¿Estás seguro de que quieres eliminar el curso ${title}? No se puede revertir.`}
      >
        <Button size="sm" disabled={isLoading}>
          {isLoading ? <Loader className="animate-spin h-4 w-4" /> : <Trash className="h-4 w-4" />}
        </Button>
      </ConfirmModal>
    </div>
  )
}