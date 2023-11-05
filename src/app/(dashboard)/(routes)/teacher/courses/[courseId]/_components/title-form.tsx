"use client"


import { Button } from "@/components/ui/button"

import { LoadingCuadraditos, LoadingSpinnerChico, LoadingSvg } from "@/components/loadingSpinner"
import { toast } from "@/components/ui/use-toast"
import { Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Props{
  id: string
  initialData: {
    title: string
  }
  update: (id: string, newTitle: string) => Promise<boolean>
}

export function TitleForm({ id, initialData, update }: Props) {

  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing(!isEditing)

  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState(initialData.title)

  async function onSubmit() {
    setLoading(true)
    toggleEdit()
    const ok= await update(id, title)
    
    if (ok) {
      toast({title: "Título editado" })
    } else {      
      toast({title: "Error al editar el título", variant: "destructive"})
    }

    setLoading(false)
  }

  function handleEnterKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      onSubmit()
    }
  }


  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex flex-col">
        Título
            {
              isEditing ? (

                <div className="flex items-center justify-between gap-1 font-medium">
                  <input
                    name="title"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    autoFocus
                    disabled={!isEditing}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={handleEnterKey}
                    onBlur={onSubmit}
                  />
                </div>

              ) : 
              loading ? (
                <div className="h-10">
                  <LoadingSpinnerChico />
                </div>
              ) : (
                <Button 
                  onClick={toggleEdit} 
                  variant="ghost" 
                  type="button" 
                  className="text-xl p-0 font-bold flex justify-between">
                  <><p>{initialData.title}</p> <Pencil className="w-5 h-5" /></>                      
                </Button>
              )
            }
    </div>
    </div>
  )
}