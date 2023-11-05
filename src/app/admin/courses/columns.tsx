"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { ArrowUpDown, CheckCircle2, Edit, Eye, LockKeyhole, Pencil } from "lucide-react"
import Image from "next/image"
import { CourseDAO } from "@/app/(dashboard)/_services/actions"
import { DeleteDialog } from "./delete-dialog"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { formatPrice } from "@/lib/format"

export const columns: ColumnDef<CourseDAO>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Ordenar por título
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const data = row.original
      const imageUrl = data.imageUrl ?? "/images/placeholder.png"
        return (
          <div className="flex flex-col md:flex-row items-center gap-2">
            <div className="flex flex-col lg:flex-row md:items-start gap-2 flex-1 items-center">
              <div className="min-w-[220px]">
                <Link href={`/teacher/courses/${data.id}`} prefetch={false} className="text-lg font-medium">
                  <Image src={imageUrl} width={220} height={200} alt="User image" className="rounded-md"/>
                </Link>
              </div>
              <div className="w-full flex flex-col text-center md:text-left">
                <Link href={`/teacher/courses/${data.id}`} prefetch={false} className="text-lg font-medium w-full">
                  {data.title}
                </Link>
                <p className="text-sm text-gray-500">{data.description}</p>
              </div>
            </div>

            <div className="gap-2 w-48 flex flex-col  border rounded-md h-36 justify-between items-center p-1">
              <Badge className="w-fit min-w-[160px] hover:bg-purple-500 justify-center bg-purple-500 font-bold">{data.categoryName}</Badge>
              <p className="text-sm text-gray-500">{format(new Date(data.createdAt), "dd MMMM yyyy", { locale: es })}</p>
              <div className="flex items-center justify-between w-full">
                <p className="text-sm text-gray-500 flex gap-1 items-center">{ data.isPublished ?  <CheckCircle2 className="text-green-500" /> : <LockKeyhole />}</p> 
                {data.price !== null && <p className="text-sm text-gray-500 pl-3">{formatPrice(data.price)}</p>}
              </div>
            </div>
          </div>
      )    
    },
  },
  {
    accessorKey: "categoryName",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Categoría
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

]
