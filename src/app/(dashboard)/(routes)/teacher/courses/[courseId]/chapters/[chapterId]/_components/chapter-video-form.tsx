"use client";

import * as z from "zod";
import MuxPlayer from "@mux/mux-player-react";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { toast } from "@/components/ui/use-toast";

type Props= {
  id: string
  initialData: Chapter & { muxData?: MuxData | null }
  update: (id: string, videoURL: string) => Promise<boolean>
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export function ChapterVideoForm({ initialData, id, update }: Props) {

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    update(id, values.videoUrl)
    .then(() => {
      toast({title: "Video actualizado!"})
      toggleEdit();
      router.refresh();
    })
    .catch((error) => {
      toast({title: `Algo salió mal (${error.message})`, variant: "destructive"})
    })
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Vídeo del capítulo
        <Button onClick={toggleEdit} variant="ghost" className="p-0">
          {isEditing && (
            <>Cancelar</>
          )}
          {!isEditing && !initialData.videoUrl && (
            <PlusCircle className="h-5 w-5 mr-2" />
          )}
          {!isEditing && initialData.videoUrl && (
            <Pencil className="h-5 w-5 mr-2" />
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md cursor-pointer" onClick={toggleEdit}>
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer
              playbackId={initialData?.muxData?.playbackId || ""}
            />
          </div>
        )
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
           Subir video para este capítulo
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Los videos pueden tardar unos minutos en procesarse. Actualice la página si el video no aparece.
        </div>
      )}
    </div>
  )
}