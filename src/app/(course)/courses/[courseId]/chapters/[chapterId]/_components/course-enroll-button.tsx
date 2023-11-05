"use client";

import { enrollAction } from "@/app/(dashboard)/_services/actions";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { formatPrice } from "@/lib/format";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export function CourseEnrollButton({ price, courseId }: CourseEnrollButtonProps) {

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const onClick = async () => {
    setIsLoading(true);
    enrollAction(courseId)
    .then((response) => {
      toast({title: "Listo, Te has inscrito al curso!"})
      router.refresh()
    })
    .catch((error) => {
      toast({ title: `${error.message}`, variant: "destructive"})
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-full md:w-auto"
    >
      {
        price === 0 ?
        "Inscribirte gratis" :
        "Comprar por " + formatPrice(price)
      }
    </Button>
  )
}