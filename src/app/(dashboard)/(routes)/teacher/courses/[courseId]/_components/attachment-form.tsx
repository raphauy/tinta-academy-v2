"use client";

import { Attachment, Course } from "@prisma/client";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as z from "zod";

import { createAttachmentAction, deleteAttachmentAction } from "@/app/(dashboard)/_services/actions";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
};

const formSchema = z.object({
  url: z.string().min(1),
});

export const AttachmentForm = ({
  initialData,
  courseId
}: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    createAttachmentAction(courseId, values.url)
    .then(() => {
      toast({ title: "Attachment creado" });
      toggleEdit();
      router.refresh();
    })
    .catch(() => {
      toast({ title: "Error al crear el attachment" });
    })
  }

  const onDelete = async (id: string) => {
    setDeletingId(id);

    deleteAttachmentAction(id)
    .then(() => {
      toast({ title: "Attachment eliminado" });
      router.refresh();
    })
    .catch((error) => {
      toast({ title: `Error al eliminar el attachment (${error.message})` });
    })

    setDeletingId(null);
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Archivos adjuntos del curso
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Cancelar</>
          )}
          {!isEditing && (
            <PlusCircle className="h-5 w-5 mr-2" />
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No hay adjuntos aún
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">
                    {attachment.name}
                  </p>
                  {deletingId === attachment.id && (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      onClick={() => onDelete(attachment.id)}
                      className="ml-auto hover:opacity-75 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Agrega cualquier cosa que tus estudiantes puedan necesitar para completar el curso
          </div>
        </div>
      )}
    </div>
  )
}