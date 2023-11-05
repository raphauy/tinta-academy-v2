"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Combobox } from "@/components/ui/combobox";
import { toast } from "@/components/ui/use-toast";
import { updateAction } from "@/app/(dashboard)/_services/actions";
import { Badge } from "@/components/ui/badge";

interface CategoryFormProps {
  initialData: Course;
  courseId: string;
  options: { label: string; value: string; }[];
};

const formSchema = z.object({
  categoryId: z.string().min(1),
});

export function CategoryForm({ initialData, courseId, options }: CategoryFormProps) {
  
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData?.categoryId || ""
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    updateAction(courseId, values)
    .then((course) => {
      toast({ title: "Categoría actualizada" })
      toggleEdit()
      router.refresh()  
    })
    .catch((error) => {
      toast({title: `Algo salió mal (${error.message})`, variant: "destructive"})
    })
  }

  const selectedOption = options.find((option) => option.value === initialData.categoryId);

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Categoría
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
          !initialData.categoryId && "text-slate-500 italic"
        )}>
          {selectedOption?.label ? <Badge className="bg-purple-500 hover:bg-purple-500 font-bold">{selectedOption?.label}</Badge> : "Sin categoría"}
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
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox
                      options={...options}
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
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}