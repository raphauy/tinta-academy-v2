"use client"

import { signOut, useSession } from "next-auth/react";

import { ExternalLink, LockKeyhole, LogOut, User } from "lucide-react";
import Link from "next/link";


export default function PopOverUserHandler() {
  const { data:session }= useSession()

  const user= session?.user

  if (!user)
      return <div></div>

  function onLogout(){
    signOut({ callbackUrl: '/login' })    
  }
      
  return (
    <>
      <nav className="flex flex-col mt-1 text-sm text-gray-600 min-w-[220px]">
        <ul>
          <li className="flex items-center gap-2 px-2 pt-2 ml-1">
            <User /> {user.email} 
          </li>
          <div className="border-b mx-4 my-2" />
          {user.role === 'admin' && <AdminMenu />}
          <div className="border-b mx-4 mb-2 mt-16" />
          <li className="w-full hover:bg-gray-200">
            <Link href="https://tinta.wine" target="_blank" className="flex items-center flex-grow justify-between px-4 py-2 rounded-md cursor-pointer  ">
              <p>Web de Tinta</p><ExternalLink size={20} />
            </Link>
          </li>
          <li className="w-full hover:bg-gray-200">
            <div onClick={onLogout} 
              className="flex items-center flex-grow px-4 py-2 justify-between cursor-pointer">
              <p>Logout</p> <LogOut size={20}/>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}

function AdminMenu() {
  return (
    <>
      <li className="w-full hover:bg-gray-200">
        <Link href="/admin" className="flex items-center flex-grow justify-between px-4 py-2 rounded-md cursor-pointer  ">
          <p>Admin</p><LockKeyhole size={20} />
        </Link>
      </li>
      <div className="border-b mx-4 my-2" />
    </>
  );
}
