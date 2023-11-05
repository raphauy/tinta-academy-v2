"use client"

import { ConfirmModal } from "@/components/confirm-modal"
import { Button } from "@/components/ui/button"
import { Course } from "@prisma/client"
import { redirect, useRouter } from "next/navigation"

type Props = {
    price: number | null
}

export default function EnrollPreviewButton({ price }: Props) {
    const router = useRouter()
  return (
    <ConfirmModal
        onConfirm={() => router.push("/login")}
        title="Inscripción"
        description="Para inscribirte debes estar logueado en la plataforma, solo necesitas un correo electrónico."
    >
        <Button size="sm">
        {price === 0 ? "Inscribirte gratis" : `Comprar por $${price}`}
        </Button>      
    </ConfirmModal>

  )
}
