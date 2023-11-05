
import { getAllCoursesDAO, getTeacherCoursesDAO } from "@/app/(dashboard)/_services/actions"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { getCategories } from "../categories/_services/services"
 
export default async function Page() {
  
  const data= await getAllCoursesDAO()
  const categories= await getCategories()
  const dataCategories= categories.map(category => category.name)

  return (
    <div className="w-full">      

      <div className="container p-3 py-4 mx-auto border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={data} pageSize={50} subject="Course" columnsOff={["categoryName"]} categories={dataCategories}/>
      </div>
    </div>
)
}
