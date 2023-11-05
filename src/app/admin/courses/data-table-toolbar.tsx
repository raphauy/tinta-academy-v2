"use client"

import { Table } from "@tanstack/react-table"
import { PlusCircle, X } from "lucide-react"

import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  categories: string[];
}


export function DataTableToolbar<TData>({ table, categories }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex gap-1 dark:text-white">
        <Input className="max-w-xs" placeholder="Filtro por título..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}                
        />
        {table.getColumn("categoryName") && (
          <DataTableFacetedFilter
            column={table.getColumn("categoryName")}
            title="Categoría"
            options={categories}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="w-4 h-4 ml-2" />
          </Button>
        )}
        <div className="flex-1 flex justify-end">
          <Link href="/teacher/create">
            <Button><PlusCircle className="h-4 w-4 mr-2" />Crear curso</Button>
          </Link>
        </div>
    </div>
  )
}