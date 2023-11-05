import { NavbarRoutes } from "@/components/navbar-routes"

import { MobileSidebar } from "./mobile-sidebar"
import Logged from "@/components/login/logged"

export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex gap-1 items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
      <Logged />
    </div>
  )
}