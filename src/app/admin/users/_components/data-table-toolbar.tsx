"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Role } from "../_services/actions"
import { ROLES } from "../_services/services"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const roles: string[]= [...ROLES]

  return (
    <div className="flex gap-1 dark:text-white">
        <Input className="max-w-xs" placeholder="Filter name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}                
        />
        <Input className="max-w-xs" placeholder="Filter email..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}                
        />
        {table.getColumn("role") && (
          <DataTableFacetedFilter
            column={table.getColumn("role")}
            title="Role"
            options={roles}
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
        <div className="flex-1 ">
          <DataTableViewOptions table={table}/>
        </div>
    </div>
  )
}