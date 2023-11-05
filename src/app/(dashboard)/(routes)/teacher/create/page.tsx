"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { createAction } from "@/app/(dashboard)/_services/actions";
import { Loader } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export type FormValues = z.infer<typeof formSchema>

function CreatePage() {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ""
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: FormValues) => {

  createAction(values.title)
  .then((course) => {
    toast({title: "Curso creado" })
    router.push(`/teacher/courses/${course.id}`)
  })
  .catch((error) => {
    toast({title: error.message })
  })
}

  return ( 
    <div className="max-w-5xl mx-auto flex md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">
          Nombre del curso
        </h1>
        <p className="text-sm text-slate-600">
            ¿Cómo te gustaría nombrar tu curso? No te preocupes, puedes cambiar esto más tarde.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Título del curso
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="ej: 'Introducción al Marketing del vino'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    ¿Qué enseñarás en este curso?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button type="button" variant="ghost" onClick={() => router.back()}>
                Cancelar
              </Button>
              <Button type="submit" disabled={!isValid} className="w-32">
                {isSubmitting && <Loader/>}Continuar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
   );
}
 
export default CreatePage;