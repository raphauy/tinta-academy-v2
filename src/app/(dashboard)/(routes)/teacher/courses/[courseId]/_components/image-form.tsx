"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { toast } from "@/components/ui/use-toast";
import { updateAction } from "@/app/(dashboard)/_services/actions";

interface ImageFormProps {
  initialData: Course
  courseId: string;
};

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export function ImageForm({ initialData, courseId }: ImageFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    updateAction(courseId, values)
    .then((course) => {
      toast({title: "Imagen editada" })
      toggleEdit()
      router.refresh()  
    })
    .catch((error) => {
      toast({title: `Algo salió mal (${error.message})`, variant: "destructive"})
    })
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Imagen del curso
        <Button onClick={toggleEdit} variant="ghost" className="p-0">
          {isEditing && (
            <>Cancelar</>
          )}
          {!isEditing && !initialData.imageUrl && (
            <PlusCircle className="h-5 w-5 mr-2" />
          )}
          {!isEditing && initialData.imageUrl && (
            <Pencil className="h-5 w-5 mr-2" />
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md cursor-pointer" onClick={toggleEdit}>
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
            />
          </div>
        )
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Aspect/Ratio recommendado: 16:9
          </div>
        </div>
      )}
    </div>
  )
}