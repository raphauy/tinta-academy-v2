"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { User } from "@prisma/client"
import { Edit, PlusCircle } from "lucide-react"
import { useState } from "react"
import { FormComponent } from "./form"

interface Props{
  editId?: string
}

export function DialogComponent({ editId }: Props) {
  const [open, setOpen] = useState(false)

  const trigger= getTrigger(editId)
  const title = editId ? "Edit User" : "Add User"

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <FormComponent editId={editId} closeDialog={() => setOpen(false)}/>
      </DialogContent>
    </Dialog>
  )
}


function getTrigger(editId?: string) {

  if (editId) {
    return <Edit size={30} className="pr-2 hover:cursor-pointer text-sky-400"/>    
  }

  return <Button><PlusCircle size={22} className="mr-2"/>Add</Button>
}