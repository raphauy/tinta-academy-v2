"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { ArrowUpDown } from "lucide-react"
import Image from "next/image"
import { DialogComponent } from "./_components/main-dialog"
import { UserDAO } from "./_services/actions"
import { DeleteDialog } from "./_components/delete-dialog"

export const columns: ColumnDef<UserDAO>[] = [
  {
    accessorKey: "image",
    header: ({ column }) => {
        return (
          <div></div>
    )
    },
    cell: ({ row }) => {
      const data = row.original
      if (!data.image) return <div></div>
      return (
        <Image src={data.image} width={50} height={50} alt="User image" className="rounded-full"/>
        )
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Nombre
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
    )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
    )
  },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Rol
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "verified",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Verificado
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const data = row.original
      if (!data.verified) return <div></div> 
      return (<p>{data.verified && format(data.verified, "MMMM dd, yyyy", { locale: es})}</p>)
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data= row.original

      return (
        <div className="flex items-center justify-end gap-2">
          <DialogComponent editId={data.id} />
          <DeleteDialog user={data} />
        </div>

      )
    },
  },
]
