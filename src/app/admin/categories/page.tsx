
import { DialogComponent } from "./_components/main-dialog"
import { columns } from "./columns"
import { DataTable } from "./_components/data-table"
import { getCategories } from "./_services/services"
import { getCategoriesDAO } from "./_services/actions"
 
export default async function CategoriesPage() {
  
  const categories= await getCategoriesDAO()

  return (
    <div className="w-full">      

      <div className="flex justify-end mx-auto my-2">
        <DialogComponent /> 
      </div>

      <div className="container p-3 py-4 mx-auto border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={categories} pageSize={50} columnsOff={["rol"]} subject="User"/>      
      </div>
    </div>
)
}
