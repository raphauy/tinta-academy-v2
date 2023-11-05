"use server"

import { revalidatePath } from "next/cache";
import { FormValues } from "../_components/form";
import { ROLES, create, eliminate, getUser, getUsers, update } from "./services";
import { User } from "@prisma/client";


export type Role = typeof ROLES[number]

export type UserDAO = {
    id: string
    email: string
    name: string | null
    verified: Date | null
    role: Role
    image: string | null
}

export async function extract(user: User): Promise<UserDAO> {
  const data: UserDAO= {
      id: user.id,
      email: user.email,
      name: user.name,
      verified: user.emailVerified,
      role: user.role as UserDAO["role"],
      image: user.image,
  }
  return data
}


export async function getUsersDAO() {
    const users= await getUsers()

    const data: UserDAO[]= await Promise.all(users.map(extract))
    
    return data    
}

export async function getUserDAO(userId: string): Promise<UserDAO>{
    const user= await getUser(userId)

    const data: UserDAO= await extract(user)
    return data
}

export async function createAction(data: FormValues): Promise<UserDAO> {       
    const created= await create(data)

    console.log(created);

    revalidatePath(`/admin/users`)

    const res= extract(created)

    return res
}
  
export async function updateAction(userId: string, data: FormValues): Promise<UserDAO> {  
    const edited= await update(userId, data)

    revalidatePath(`/admin/users`)

    const res= extract(edited)

    return res   
}


export async function eliminateAction(userId: string): Promise<UserDAO> {    
    const deleted= await eliminate(userId)

    revalidatePath(`/admin/users`)

    const res= extract(deleted)

    return res
}

