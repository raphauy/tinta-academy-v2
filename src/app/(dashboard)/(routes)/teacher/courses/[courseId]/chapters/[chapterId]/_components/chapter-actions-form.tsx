"use client";

import { eliminateChapterAction, publishChapterAction, unPublishChapterAction  } from "@/app/(dashboard)/_services/actions";
import { ConfirmModal } from "@/components/confirm-modal";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Loader, Trash } from "lucide-react";
import { useState } from "react";

type Props= {
  id: string
  disabled: boolean
  initialData: {
    isPublished: boolean
    title: string
  }
}

export function ChapterActionsForm({ initialData, id, disabled }: Props) {

  const [isPublished, setIsPublished] = useState(initialData.isPublished)
  const [isLoading, setIsLoading] = useState(false);

  function onToggle() {
    console.log("onToggle")
    
    setIsLoading(true)

    const action= isPublished ? unPublishChapterAction : publishChapterAction

    action(id, !isPublished)
    .then(() => {
      if (isPublished) {
        toast({title: "Ahora este capítulo NO está publicado!"})
      } else {
        toast({title: "Ahora este capítulo está publicado!"})
      }
      setIsPublished(!isPublished)
    })
    .catch((error) => {
      toast({title: `Algo salió mal (${error.message})`, variant: "destructive"})
    })
    .finally(() => {
      setIsLoading(false)
    })

  }

  function onDelete() {
    setIsLoading(true)

    eliminateChapterAction(id)
    .then((course) => {
      toast({title: "Capítulo borrado!"})
    })
    .catch((error) => {
      toast({title: `Algo salió mal (${error.message})`, variant: "destructive"})
    })
    .finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onToggle}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      
      <ConfirmModal 
        onConfirm={onDelete}
        title="Eliminar capítulo"
        description={`¿Estás seguro de que quieres eliminar este capítulo '${initialData.title}'? No se puede revertir`}
      >
        <Button size="sm" disabled={isLoading}>
          {isLoading ? <Loader className="animate-spin h-4 w-4" /> : <Trash className="h-4 w-4" />}          
        </Button>      
      </ConfirmModal>
    </div>
  )
}