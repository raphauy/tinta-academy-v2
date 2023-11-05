import { redirect } from "next/navigation";  
import { SearchInput } from "@/components/search-input"; 
import { getCategories } from "@/app/admin/categories/_services/services";
import { CoursesList } from "@/components/courses-list";
import { getCurrentUser } from "@/lib/auth";
import { Categories } from "../(dashboard)/(routes)/search/_components/categories";
import { getAllCourses } from "../(dashboard)/_services/course-service";
import { CourseCard } from "@/components/course-card";
import { searchCourses } from "../(dashboard)/_services/search-courses";
import { searchGuestCourses } from "../(dashboard)/_services/search-guest-courses";
  
interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
};
 
  
export default async function SearchPage({ searchParams }: SearchPageProps) {

  const categories = await getCategories()

  const courses = await searchGuestCourses({...searchParams,})

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
  
  