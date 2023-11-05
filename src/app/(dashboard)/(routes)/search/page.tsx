import { redirect } from "next/navigation";  
import { SearchInput } from "@/components/search-input"; 
import { Categories } from "./_components/categories";
import { getCategories } from "@/app/admin/categories/_services/services";
import { getAllCourses, getTeacherCourses } from "../../_services/course-service";
import { CoursesList } from "@/components/courses-list";
import { searchCourses } from "../../_services/search-courses";
import { getCurrentUser } from "@/lib/auth";
  
interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
};
 
  
export default async function SearchPage({ searchParams }: SearchPageProps) {

  const currentUser = await getCurrentUser()
  if (!currentUser) redirect("/login")  
 
  const categories = await getCategories()

  const courses = await searchCourses({userId: currentUser.id, ...searchParams,})

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories
          items={categories}
        />
        <CoursesList items={courses} />
      </div>
    </>
    );
}
  
  