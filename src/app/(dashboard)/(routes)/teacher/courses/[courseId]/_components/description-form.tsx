"use client"


import { Button } from "@/components/ui/button"

import { LoadingSpinnerChico } from "@/components/loadingSpinner"
import { toast } from "@/components/ui/use-toast"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { Preview } from "@/components/preview"


type Props= {
  id: string
  initialData: {
    description: string | null
  }
  update: (id: string, description: string) => Promise<boolean>
}

export function DescriptionForm({ initialData, id, update }: Props) {


  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing(!isEditing)

  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState(initialData.description || "")

  async function onSubmit() {
    setLoading(true)
    toggleEdit()
    update(id, description)
    .then(() => {
      toast({title: "Descripción editada" })
    })
    .catch((error) => {
      toast({title: `Algo salió mal (${error.message})`, variant: "destructive"})
    })
    setLoading(false)
  }


  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex flex-col">
        Descripción

            {
              isEditing ? (

                <div className="flex items-center justify-between gap-1 font-medium">
                  <textarea
                    rows={5}
                    cols={40}
                    name="description"
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    autoFocus
                    disabled={!isEditing}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={onSubmit}
                  />
                </div>

              ) : 
              loading ? (
                <div className="h-10">
                  <LoadingSpinnerChico />
                </div>
              ) : (
                <div className="flex justify-between">
                  <p className="text-lg">{initialData.description}</p>

                  <Button onClick={toggleEdit} variant="ghost" type="button" className="p-0">
                    <Pencil className="w-5 h-5" />
                  </Button>
                </div>
              )
            }
      </div>
    </div>
  )
}