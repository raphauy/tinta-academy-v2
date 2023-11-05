
import { DialogComponent } from "./_components/main-dialog"
import { getUsersDAO } from "./_services/actions"
import { columns } from "./columns"
import { DataTable } from "./_components/data-table"
 
export default async function WinesPage() {
  
  const users= await getUsersDAO()

  return (
    <div className="w-full">      

      <div className="flex justify-end mx-auto my-2">
        <DialogComponent /> 
      </div>

      <div className="container p-3 py-4 mx-auto border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={users} pageSize={50} columnsOff={["rol"]} subject="User"/>      
      </div>
    </div>
)
}
