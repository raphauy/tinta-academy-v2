"use client";

import { usePathname, useRouter } from "next/navigation";
import { LockKeyhole, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { isTeacher } from "@/lib/teacher";
import { SearchInput } from "./search-input";
import { useSession } from "next-auth/react";

export const NavbarRoutes = () => {
  const { data } = useSession();
  const user = data?.user;
  const pathname = usePathname();
  const router = useRouter();

  const isAdmin= user?.role === "admin"
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isPreviewPage = pathname?.includes("/preview");
  const isSearchPage = pathname === "/search" || pathname === "/";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">

        {isAdmin && (
          <Link href="/admin">
            <Button size="sm" variant="ghost">
              <LockKeyhole className="h-4 w-4 mr-2" />
              Admin
            </Button>
          </Link>
        ) }

        {isTeacherPage || isCoursePage || isPreviewPage ? (
          <Link href={isPreviewPage ? "/" : "/dashboard"}>
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Salir
            </Button>
          </Link>
        ) : isTeacher(user?.role || "") ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        ) : null
        }


      </div>
    </>
  )
}