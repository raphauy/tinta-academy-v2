"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { el, is } from "date-fns/locale";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type Props= {
  id: string
  initialData: {
    isFree: boolean
  }
  update: (id: string, isFree: boolean) => Promise<boolean>
}

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

export function ChapterAccessForm({ initialData, id, update }: Props) {

  const [isFree, setIsFree] = useState(initialData.isFree)

  function onToggle() {
    update(id, !isFree)
    .then(() => {
      if (!isFree) {
        toast({title: "Ahora este capítulo es gratuito!"})
      } else {
        toast({title: "Ahora este capítulo NO es gratuito!"})
      }
      setIsFree(!isFree)
    })
    .catch((error) => {
      toast({title: `Algo salió mal (${error.message})`, variant: "destructive"})
    })
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Acceso gratuito a este capítulo
        <Switch checked={isFree} onCheckedChange={onToggle} />
      </div>
    </div>
  )
}