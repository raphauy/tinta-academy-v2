"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Editor } from "@/components/editor";
import { Preview } from "@/components/preview";
import { toast } from "@/components/ui/use-toast";
import { LoadingSpinnerChico } from "@/components/loadingSpinner";

type Props= {
  id: string
  initialData: {
    description: string | null
  }
  update: (id: string, description: string) => Promise<boolean>
}

const formSchema = z.object({
  description: z.string().min(1),
});

export function DescriptionRichTextForm({ initialData, id, update }: Props) {

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false)

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || ""
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    update(id, form.getValues("description"))
    .then(() => {
      toast({title: "Descripción editada" })
      toggleEdit()
    })
    .catch((error) => {
      toast({title: `Algo salió mal (${error.message})`, variant: "destructive"})
    })
    setLoading(false)
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Descripción
        <Button onClick={toggleEdit} variant="ghost" className="p-0">
          {isEditing ? (
            <>Cancelar</>
          ) : (
            <Pencil className="h-5 w-5" />
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className={cn(
          "text-sm mt-2",
          !initialData.description && "text-slate-500 italic"
        )}>
          {!initialData.description && "Sin descripción"}
          {initialData.description && (
            <Preview
              value={initialData.description}                            
            />
          )}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                {loading ? <LoadingSpinnerChico /> : "Guardar"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}