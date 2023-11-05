"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { LoadingSpinnerChico } from "@/components/loadingSpinner"
import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { createAction, getCategoryDAO, updateAction } from "../_services/actions"

const formSchema = z.object({  
  name: z.string().min(1).max(50),
  icon: z.string().optional(),
})

export type FormValues = z.infer<typeof formSchema>

const defaultValues: Partial<FormValues> = {}

interface Props{
  editId?: string
  closeDialog: () => void
}

export function FormComponent({ editId, closeDialog }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  })
  const [loading, setLoading] = useState(false)

  async function onSubmit(data: FormValues) {

    setLoading(true)
    if (editId) {
      updateAction(editId, data)
      .then(() => {
        toast({title: "Usuario actualizado" })
        closeDialog()
      })
      .catch((error) => {
        toast({title: error.message})
      })      
    } else {
      createAction(data)
      .then(() => {
        toast({title: "Usuario creado" })
        closeDialog()
      })
      .catch((error) => {
        toast({title: error.message})
      })
    }
    setLoading(false)
  }

  useEffect(() => {

    if (editId) {
      getCategoryDAO(editId).then((data) => {
        if (!data) return
        form.setValue("name", data.name)
        data.icon && form.setValue("icon", data.icon)
      })
    }  
  }, [form, editId])



  return (
    <div className="p-4 bg-white rounded-md">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del usuario" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lucide Icon</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del usuario" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      <div className="flex justify-end">
          <Button onClick={() => closeDialog()} type="button" variant={"secondary"} className="w-32">Cancelar</Button>
          <Button type="submit" className="w-32 ml-2" >{loading ? <LoadingSpinnerChico /> : <p>Guardar</p>}</Button>
        </div>
      </form>
    </Form>
   </div>
 )
}