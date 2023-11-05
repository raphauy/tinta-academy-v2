"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { GraduationCap, LayoutDashboard, MessageCircle, PanelRightClose, PlusCircle, Rss, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {

  const path= usePathname()

  const commonClasses= "flex gap-2 items-center py-1 mx-2 rounded hover:bg-gray-200 dark:hover:text-black"
  const selectedClasses= "font-bold text-osom-color dark:border-r-white"

  const dashboardSelected= path.endsWith("admin")
  const dashboard= clsx(commonClasses, dashboardSelected  && selectedClasses)

  const usersSelected= path.endsWith("users")
  const users= clsx(commonClasses, usersSelected  && selectedClasses)

  const coursesSelected= path.endsWith("courses")
  const courses= clsx(commonClasses, coursesSelected  && selectedClasses)

  const categoriesSelected= path.endsWith("categories")
  const categories= clsx(commonClasses, categoriesSelected  && selectedClasses)

  const configSelected= path.endsWith("config")
  const config= clsx(commonClasses, configSelected  && selectedClasses)

  const pClasses= "hidden sm:block lg:w-36"

  return (
    <div className="flex flex-col justify-between border-r border-r-osom-color/50">
      <section className="flex flex-col gap-3 py-4 mt-3 ">

        <Link href="/admin" className={dashboard}>
          <LayoutDashboard size={23} />
          <p className={pClasses}>Dashboard</p>                  
        </Link>

        {divider()}

        <Link href="/admin/users" className={users}>
          <User size={23} />
          <p className={pClasses}>Users</p>                  
        </Link>

        {divider()}
        
        <Link href="/admin/courses" className={courses}>
          <GraduationCap size={23} />
          <p className={pClasses}>Courses</p>                  
        </Link>

        <Link href="/admin/categories" className={categories}>
          <PanelRightClose size={23} />
          <p className={pClasses}>Categories</p>                  
        </Link>

        {divider()}


      </section>
      <section className="mb-4">
        {divider()}
        
        <Link href="/admin/config" className={config}>
          <Settings />
          <p className={pClasses}>Config</p>                  
        </Link>
      </section>
    </div>
  );
}


function divider() {
  return <div className="mx-2 my-5 border-b border-b-osom-color/50" />
}
