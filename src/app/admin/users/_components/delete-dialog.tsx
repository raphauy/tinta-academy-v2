"use client"

import { LoadingSpinnerChico } from "@/components/loadingSpinner"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { DialogDescription } from "@radix-ui/react-dialog"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { UserDAO, eliminateAction } from "../_services/actions"

interface Props{
  user: UserDAO
}

export function DeleteDialog({ user }: Props) {
  const [open, setOpen] = useState(false)
  const [isPending, setIsPending] = useState(false)

  const title = "Delete User"
  const description = `Are you sure you want to delete user ${user.name || user.email}?`

  function handleDelete() {
    setIsPending(true)
    eliminateAction(user.id)
    .then(() => {
      toast({title: "User deleted" })
      setOpen(false)
    })
    .catch((error) => {
      toast({title: error.message})
    })    
    setIsPending(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash2 className="text-red-400 hover:cursor-pointer"/>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="py-8">{description}</DialogDescription>
        </DialogHeader>
          <div>
            <Button onClick={() => setOpen(false)} type="button" variant={"secondary"} className="w-32">Cancel</Button>
            <Button onClick={handleDelete} variant="destructive" className="w-32 ml-2">
            {
                isPending ? 
                <LoadingSpinnerChico /> :
                <p>Delete</p>
              }
            </Button>
          </div>
      </DialogContent>
    </Dialog>
  )
}
