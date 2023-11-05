

import { CourseCard } from "@/components/course-card";
import { getAllCourses } from "./(dashboard)/_services/course-service";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getCategories } from "./admin/categories/_services/services";
import { searchGuestCourses } from "./(dashboard)/_services/search-guest-courses";
import { SearchInput } from "@/components/search-input";
import { Categories } from "./(dashboard)/(routes)/search/_components/categories";
import { CoursesList } from "@/components/courses-list";
import { Navbar } from "./(dashboard)/_components/navbar";
import LogoTinta from "./(dashboard)/_components/logoTinta";
import { NavbarRoutes } from "@/components/navbar-routes";
import Logged from "@/components/login/logged";

interface Props {
  searchParams: {
    title: string;
    categoryId: string;
  }
};

export default async function Home({ searchParams }: Props) {

  const currentUser = await getCurrentUser()
  const role= currentUser?.role
  if (currentUser) {
    if (role==="teacher" || role==="admin") return redirect("/teacher/courses")
    if (role==="user") return redirect("/search")
  }

  const categories = await getCategories()

  const courses = await searchGuestCourses({...searchParams,})

  return (
    <>
      <div className="p-4 h-[80px] border-b shadow-sm flex justify-between items-center">
        <LogoTinta />
        <Logged />
      </div>

      <div className="items-center mt-4 flex flex-col gap-4">
        <SearchInput />

        <Categories items={categories} />

        <CoursesList items={courses} preview={true} />
      </div>
    </>
  )
}
