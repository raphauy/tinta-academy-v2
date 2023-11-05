import { Command, Link } from "lucide-react"
import { Metadata } from "next"

import getSession, { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { UserAuthForm } from "./user-auth-form"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default async function AuthenticationPage() {
  const session= await getSession()
  const user= await getCurrentUser()
  const role= user?.role
  if (role === "admin")
    redirect("/admin")
  else if (role === "user")
    redirect("/")

    return (
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] mt-10">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Identificación de usuarios
          </h1>
        </div>
        <UserAuthForm />
      </div>
)
  }