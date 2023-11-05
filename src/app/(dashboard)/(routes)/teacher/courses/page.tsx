
import { getTeacherCoursesDAO } from "@/app/(dashboard)/_services/actions";
import { getCategories } from "@/app/admin/categories/_services/services";
import { columns } from "@/app/admin/courses/columns";
import { DataTable } from "@/app/admin/courses/data-table";
import { getCurrentUser } from "@/lib/auth";
import { isTeacher } from "@/lib/teacher";
import { redirect } from "next/navigation";

export default async function CoursesPage() {

  const user= await getCurrentUser()
  if (!user) return redirect("/login")

  if (!isTeacher(user.role)) return redirect(`/unauthorized?message=No eres un profesor`)

  const data= await getTeacherCoursesDAO()
  const categories= await getCategories()
  const dataCategories= categories.map(category => category.name)

  return ( 
    <div className="p-6">
      <div className="container p-3 py-4 mx-auto border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={data} pageSize={10} subject="Curso" columnsOff={["categoryName"]} categories={dataCategories}/>      
      </div>

    </div>
   );
}
 
