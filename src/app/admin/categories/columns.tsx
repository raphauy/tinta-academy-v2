"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { DeleteDialog } from "./_components/delete-dialog"
import { DialogComponent } from "./_components/main-dialog"
import { CategoryDAO } from "./_services/actions"
import * as LucideIcons from "lucide-react"
import React from "react"

export const columns: ColumnDef<CategoryDAO>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Name
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
    )
    },
    cell: ({ row }) => {
      const data = row.original
      
      // @ts-ignore
      const icon= data.icon ? LucideIcons[data.icon] : null

      return (
        <div className="flex items-center gap-2">
          {icon && React.createElement(icon)} {data.name}
        </div>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data= row.original

      return (
        <div className="flex items-center justify-end gap-2">
          <DialogComponent editId={data.id} />
          <DeleteDialog category={data} />
        </div>

      )
    },
  },
]
